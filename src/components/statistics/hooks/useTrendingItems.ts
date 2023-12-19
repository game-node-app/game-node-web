import {
    StatisticsPaginatedResponseDto,
    StatisticsService,
} from "@/wrapper/server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export interface UseTrendingItemsProps {
    minimumItems: number;
    sourceType: "game" | "review" | "activity" | "collection";
    offset: number;
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
        dto.minimumItems,
        dto.offset,
        dto.limit,
    ];
    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: queryKey.slice(0, 3) });

    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                return StatisticsService.statisticsControllerFindTrending(
                    dto.minimumItems,
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
