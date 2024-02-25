import React, { useMemo } from "react";
import { SimpleGrid, Skeleton } from "@mantine/core";
import GameGridFigure from "@/components/game/figure/GameGridFigure";
import { DetailsBox } from "@/components/general/DetailsBox";
import { useGames } from "@/components/game/hooks/useGames";
import { useTrendingGames } from "@/components/statistics/hooks/useTrendingGames";
import { FindStatisticsTrendingGamesDto } from "@/wrapper/server";

export const DEFAULT_SEARCH_TRENDING_GAMES_DTO: FindStatisticsTrendingGamesDto =
    {
        offset: 0,
        limit: 6,
        criteria: {},
    };

const TrendingGamesList = () => {
    const trendingGames = useTrendingGames(DEFAULT_SEARCH_TRENDING_GAMES_DTO);

    const gamesIds = trendingGames.data?.data?.map(
        (statistics) => statistics.gameId as unknown as number,
    );
    const gamesQuery = useGames({
        gameIds: gamesIds || [],
        relations: {
            cover: true,
        },
    });

    const isLoading = trendingGames.isLoading || gamesQuery.isLoading;

    const isEmpty =
        !isLoading &&
        (gamesQuery.data == undefined || gamesQuery.data.length === 0);

    const elementsSkeletons = useMemo(() => {
        return Array(DEFAULT_SEARCH_TRENDING_GAMES_DTO.limit)
            .fill(0)
            .map((v, i) => {
                return <Skeleton className={"h-36 lg:h-60"} key={i} />;
            });
    }, []);

    return (
        <DetailsBox
            enabled={!isEmpty}
            title={"Trending Games"}
            content={
                <SimpleGrid cols={{ base: 3, lg: 6 }} h={"100%"} w={"100%"}>
                    {isLoading && elementsSkeletons}
                    {gamesQuery.data?.map((game) => {
                        return <GameGridFigure key={game.id} game={game} />;
                    })}
                </SimpleGrid>
            }
        />
    );
};

export default TrendingGamesList;
