import {
    FindOneStatisticsDto,
    Statistics,
    StatisticsService,
    StatisticsStatus,
} from "@/wrapper/server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export type StatisticsWithStatus = Statistics & StatisticsStatus;

export function useItemStatistics(
    sourceId: string | number,
    sourceType: FindOneStatisticsDto.sourceType,
): ExtendedUseQueryResult<StatisticsWithStatus | null> {
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
            queryFn: async (): Promise<StatisticsWithStatus | null> => {
                const statistics =
                    await StatisticsService.statisticsControllerFindOneBySourceIdAndType(
                        {
                            sourceId: sourceId as any,
                            sourceType: sourceType,
                        },
                    );
                if (statistics) {
                    const statisticsStatus =
                        await StatisticsService.statisticsControllerGetStatus(
                            statistics.id,
                            sourceType,
                        );
                    return {
                        ...statistics,
                        ...statisticsStatus,
                    } as any;
                }

                return null;
            },
        }),
        invalidate,
        queryKey,
    };
}
