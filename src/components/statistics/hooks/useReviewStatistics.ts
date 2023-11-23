import React from "react";
import { useQuery, useQueryClient } from "react-query";
import {
    Statistics,
    StatisticsEntityDto,
    StatisticsService,
} from "@/wrapper/server";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export function useReviewStatistics(
    reviewId: string,
): ExtendedUseQueryResult<StatisticsEntityDto> {
    const queryClient = useQueryClient();
    const queryKey = ["statistics", "review", reviewId];
    const invalidate = () =>
        queryClient.invalidateQueries(queryKey.slice(0, 2));
    return {
        ...useQuery({
            queryKey,
            queryFn: () => {
                return StatisticsService.statisticsControllerFindOne(
                    reviewId,
                    "review",
                );
            },
        }),
        invalidate,
        queryKey,
    };
}
