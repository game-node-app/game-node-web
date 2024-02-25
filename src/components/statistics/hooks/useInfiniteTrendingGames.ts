import {
    FindStatisticsTrendingGamesDto,
    StatisticsService,
} from "@/wrapper/server";
import {
    keepPreviousData,
    useInfiniteQuery,
    useQuery,
} from "@tanstack/react-query";

export interface InfiniteQueryTrendingGamesDto
    extends Omit<FindStatisticsTrendingGamesDto, "offset" | "search"> {}

export function useInfiniteTrendingGames(dto: InfiniteQueryTrendingGamesDto) {
    const limitToUse = dto.limit || 20;

    return useInfiniteQuery({
        queryKey: ["statistics", "game", "infinite", limitToUse, dto.criteria],
        queryFn: ({ pageParam = 0 }) => {
            return StatisticsService.statisticsControllerFindTrendingGames({
                ...dto,
                offset: pageParam,
            });
        },
        getNextPageParam: (previousData, allData, lastPageParam) => {
            return lastPageParam + limitToUse;
        },
        placeholderData: keepPreviousData,
        initialPageParam: 0,
        staleTime: 300 * 1000,
    });
}
