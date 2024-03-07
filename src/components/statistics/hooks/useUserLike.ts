import {
    FindOneStatisticsDto,
    StatisticsActionDto,
    StatisticsQueueService,
} from "@/wrapper/server";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    StatisticsWithStatus,
    useItemStatistics,
} from "@/components/statistics/hooks/useItemStatistics";

interface IToggleLikeProps {
    targetUserId: string | undefined;
    sourceId: string | number;
    sourceType: FindOneStatisticsDto.sourceType;
}

/**
 * Gets information about the number of likes on an item, and performs optimist
 * toggles for likes of the current logged-in user.
 *
 * @param sourceId
 * @param sourceType
 * @param onSuccess
 */
export function useUserLike({
    sourceId,
    sourceType,
    targetUserId,
}: IToggleLikeProps) {
    const queryClient = useQueryClient();
    const statisticsQuery = useItemStatistics(sourceId, sourceType);
    const statisticsQueryKey = statisticsQuery.queryKey;
    const isLiked = statisticsQuery.data?.isLiked || false;
    const likesCount = statisticsQuery.data?.likesCount || 0;

    const likeMutation = useMutation({
        /**
         * Do not catch errors here, they should be thrown for "onError"!
         */
        mutationFn: async () => {
            const dto = {
                sourceId: `${sourceId}`,
                sourceType: sourceType as StatisticsActionDto.sourceType,
                targetUserId: targetUserId,
            };

            if (isLiked) {
                StatisticsQueueService.statisticsQueueControllerRemoveLike(
                    dto,
                ).then();
                return;
            }

            StatisticsQueueService.statisticsQueueControllerAddLike(dto).then();
        },
        onSuccess: () => {},

        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: statisticsQueryKey,
            });

            let previousStatistics =
                await queryClient.getQueryData<Promise<StatisticsWithStatus>>(
                    statisticsQueryKey,
                )!;

            if (!previousStatistics) {
                previousStatistics = {
                    isLiked: isLiked,
                    likesCount: 0,
                    viewsCount: 0,
                } as StatisticsWithStatus;
            }

            let finalLikeCount = 0;
            if (isLiked && previousStatistics.likesCount > 0) {
                finalLikeCount = --previousStatistics.likesCount;
            } else {
                finalLikeCount = ++previousStatistics.likesCount;
            }

            const newStatistics: StatisticsWithStatus = {
                ...previousStatistics,
                isLiked: !previousStatistics.isLiked,
                likesCount: finalLikeCount,
            };

            await queryClient.setQueryData(statisticsQueryKey, newStatistics);

            return {
                previousStatistics,
                newStatistics,
            };
        },

        onError: (err, _, context) => {
            console.error(err);
            queryClient.setQueryData(
                statisticsQueryKey,
                context?.previousStatistics,
            );
        },
        onSettled: () => {},
    });

    const toggleLike = () => likeMutation.mutate();

    return [likesCount, isLiked, toggleLike] as const;
}
