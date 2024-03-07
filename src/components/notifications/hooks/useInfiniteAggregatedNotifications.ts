import { ExtendedUseInfiniteQueryResult } from "@/util/types/ExtendedUseQueryResult";
import {
    NotificationAggregateDto,
    NotificationsService,
    PaginatedNotificationAggregationDto,
} from "@/wrapper/server";
import {
    keepPreviousData,
    useInfiniteQuery,
    useQueryClient,
} from "@tanstack/react-query";
import useUserId from "@/components/auth/hooks/useUserId";

export function useInfiniteAggregatedNotifications(
    limit = 20,
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
        }),
        queryKey,
        invalidate,
    };
}
