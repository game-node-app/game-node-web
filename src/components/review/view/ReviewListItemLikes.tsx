import React from "react";
import { IconThumbUp } from "@tabler/icons-react";
import { ActionIcon, Group, Text } from "@mantine/core";
import {
    Review,
    StatisticsActionDto,
    StatisticsEntityDto,
    StatisticsQueueService,
} from "@/wrapper/server";
import { useReviewStatistics } from "@/components/statistics/hooks/useReviewStatistics";
import { useMutation, useQueryClient } from "react-query";
import sourceType = StatisticsActionDto.sourceType;

interface IReviewListLikesProps {
    review: Review;
    isOwnReview: boolean;
}

const ReviewListItemLikes = ({
    review,
    isOwnReview,
}: IReviewListLikesProps) => {
    const queryClient = useQueryClient();
    const reviewStatisticsQuery = useReviewStatistics(review.id);
    const likesCount = reviewStatisticsQuery.isSuccess
        ? reviewStatisticsQuery.data.likesCount
        : 0;
    const isLiked = reviewStatisticsQuery.data?.isLiked || false;
    const statisticsQueryKey = reviewStatisticsQuery.queryKey;

    const reviewLikeMutation = useMutation({
        mutationFn: async () => {
            if (isLiked) {
                await StatisticsQueueService.statisticsQueueControllerRemoveLike(
                    {
                        sourceType: sourceType.REVIEW,
                        sourceId: review.id,
                    },
                );
                return;
            }
            await StatisticsQueueService.statisticsQueueControllerAddLike({
                sourceId: review.id,
                sourceType: sourceType.REVIEW,
            });
        },

        onMutate: async () => {
            await queryClient.cancelQueries({
                queryKey: statisticsQueryKey,
            });

            // Snapshot the previous value
            const previousStatistics =
                queryClient.getQueryData(statisticsQueryKey);
            queryClient.setQueryData<StatisticsEntityDto | undefined>(
                statisticsQueryKey,
                (old) => {
                    if (old) {
                        return {
                            ...old,
                            likesCount:
                                old.isLiked && old.likesCount > 0
                                    ? --old.likesCount
                                    : ++old.likesCount,
                            isLiked: !old.isLiked,
                        };
                    }
                    return undefined;
                },
            );

            return { previousStatistics };
        },

        onError: (err, variables, context) => {
            queryClient.setQueryData(
                statisticsQueryKey,
                context?.previousStatistics,
            );
        },
    });
    return (
        <Group gap={"0.5rem"}>
            <ActionIcon
                onClick={() => reviewLikeMutation.mutate()}
                variant={isLiked ? "filled" : "subtle"}
                size={"xl"}
                color={"brand"}
                disabled={isOwnReview}
            >
                <IconThumbUp />
                <Text>{likesCount}</Text>
            </ActionIcon>
        </Group>
    );
};

export default ReviewListItemLikes;
