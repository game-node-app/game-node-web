import {
    FindStatisticsTrendingGamesDto,
    Statistics,
    StatisticsService,
} from "@/wrapper/server";
import { useQuery } from "@tanstack/react-query";

export function useTrendingGames(dto: FindStatisticsTrendingGamesDto) {
    return useQuery({
        queryKey: [
            "statistics",
            "game",
            dto.period,
            dto.criteria,
            dto.limit,
            dto.offset,
        ],
        queryFn: () => {
            return StatisticsService.statisticsControllerFindTrendingGames(dto);
        },
    });
}
