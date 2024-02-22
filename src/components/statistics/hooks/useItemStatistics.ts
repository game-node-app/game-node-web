import {
    Statistics,
    StatisticsService,
    StatisticsStatus,
} from "@/wrapper/server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StatisticsSourceType } from "@/components/statistics/statistics-types";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

type StatisticsWithStatus = Statistics & StatisticsStatus;

export function useItemStatistics(
    sourceId: "review" | "game",
    sourceType: StatisticsSourceType,
): ExtendedUseQueryResult<StatisticsWithStatus> {
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
            queryFn: async () => {
                const statistics =
                    await StatisticsService.statisticsControllerFindOneBySourceIdAndType(
                        {
                            sourceId: sourceId as any,
                            sourceType: sourceType,
                        },
                    );
                const statisticsStatus =
                    await StatisticsService.statisticsControllerGetStatus(
                        statistics.id,
                        sourceType,
                    );
                return {
                    ...statistics,
                    ...statisticsStatus,
                };
            },
        }),
        invalidate,
        queryKey,
    };
}
