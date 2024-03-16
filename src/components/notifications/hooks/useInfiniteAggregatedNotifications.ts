import { ExtendedUseInfiniteQueryResult } from "@/util/types/ExtendedUseQueryResult";
import {
    NotificationsService,
    PaginatedNotificationAggregationDto,
} from "@/wrapper/server";
import {
    keepPreviousData,
    useInfiniteQuery,
    useQueryClient,
} from "@tanstack/react-query";
import useUserId from "@/components/auth/hooks/useUserId";

export const DEFAULT_NOTIFICATIONS_LIMIT = 10;

export function useInfiniteAggregatedNotifications(
    limit = DEFAULT_NOTIFICATIONS_LIMIT,
): ExtendedUseInfiniteQueryResult<PaginatedNotificationAggregationDto> {
    const userId = useUserId();
    const queryClient = useQueryClient();
    const queryKey = ["notifications", "aggregated", "infinite", userId];
    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey,
        });
    };

    return {
        ...useInfiniteQuery({
            queryKey,
            queryFn: ({ pageParam = 0 }) => {
                return NotificationsService.notificationsControllerFindAllAndAggregate(
                    pageParam,
                );
            },
            placeholderData: keepPreviousData,
            getNextPageParam: (previousData, allData, lastPageParam) => {
                return lastPageParam + limit;
            },
            initialPageParam: 0,
            refetchIntervalInBackground: true,
            // 1 minute
            refetchInterval: 60 * 1000,
        }),
        queryKey,
        invalidate,
    };
}
