import {
    FindStatisticsTrendingReviewsDto,
    StatisticsService,
} from "@/wrapper/server";
import { useQuery } from "@tanstack/react-query";

export function useTrendingReviews(dto: FindStatisticsTrendingReviewsDto) {
    return useQuery({
        queryKey: [
            "statistics",
            "review",
            dto.userId,
            dto.gameId,
            dto.reviewId,
            dto.period,
            dto.limit,
            dto.offset,
        ],
        queryFn: () => {
            return StatisticsService.statisticsControllerFindTrendingReviews(
                dto,
            );
        },
    });
}
