import { StatisticsActionDto, StatisticsService } from "@/wrapper/server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StatisticsSourceType } from "@/components/statistics/statistics-types";

export function useItemStatistics(
    sourceId: string,
    sourceType: StatisticsSourceType,
) {
    const queryClient = useQueryClient();
    const queryKey = ["statistics", sourceType, sourceId];
    const invalidate = () => {
        queryClient
            .invalidateQueries({ queryKey: queryKey.slice(0, 2) })
            .then()
            .catch();
    };

    return {
        ...useQuery({
            queryKey,
            queryFn: () => {
                return StatisticsService.statisticsControllerFindOne(
                    sourceId,
                    sourceType as StatisticsActionDto.sourceType,
                );
            },
        }),
        invalidate,
        queryKey,
    };
}
