import {
    StatisticsActionDto,
    StatisticsPaginatedResponseDto,
    StatisticsService,
} from "@/wrapper/server";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export interface UseTrendingItemsProps {
    sourceType: "game" | "review" | "activity" | "collection";
    offset?: number;
    limit: number;
}

export function useTrendingItems(
    dto: UseTrendingItemsProps,
): ExtendedUseQueryResult<StatisticsPaginatedResponseDto> {
    const queryClient = useQueryClient();
    const queryKey = [
        "statistics",
        "trending",
        dto.sourceType,
        dto.offset,
        dto.limit,
    ];
    const invalidate = () =>
        queryClient.invalidateQueries(queryKey.slice(0, 3));

    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                return await StatisticsService.statisticsControllerFindTrending(
                    dto.sourceType,
                    dto.offset,
                    dto.limit,
                );
            },
        }),
        queryKey,
        invalidate,
    };
}
