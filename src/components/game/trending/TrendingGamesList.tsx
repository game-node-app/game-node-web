import React, { useMemo } from "react";
import { Flex, SimpleGrid, Skeleton } from "@mantine/core";
import GameGridFigure from "@/components/game/figure/GameGridFigure";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { DetailsBox } from "@/components/general/DetailsBox";
import {
    useTrendingItems,
    UseTrendingItemsProps,
} from "@/components/statistics/hooks/useTrendingItems";
import { useGames } from "@/components/game/hooks/useGames";

export const DEFAULT_SEARCH_TRENDING_GAMES_DTO: UseTrendingItemsProps = {
    minimumItems: 6,
    sourceType: "game",
    offset: 0,
    limit: 6,
};

const TrendingGamesList = () => {
    const trendingGames = useTrendingItems(DEFAULT_SEARCH_TRENDING_GAMES_DTO);

    const gamesIds = trendingGames.data?.data?.map(
        (statistics) => statistics.sourceId as unknown as number,
    );
    const games = useGames({
        gameIds: gamesIds || [],
        relations: {
            cover: true,
        },
    });

    const isEmpty = games.data == undefined || games.data.data.length === 0;

    const elementsSkeletons = useMemo(() => {
        return Array(DEFAULT_SEARCH_TRENDING_GAMES_DTO.limit)
            .fill(0)
            .map((v, i) => {
                return <Skeleton className={"w-auto h-[240px]"} key={i} />;
            });
    }, []);

    return (
        !isEmpty && (
            <DetailsBox
                title={"Trending Games"}
                content={
                    <SimpleGrid cols={{ base: 3, lg: 6 }} h={"100%"} w={"100%"}>
                        {trendingGames.isLoading || games.isLoading
                            ? elementsSkeletons
                            : null}
                        {games.data?.data.map((game) => {
                            return <GameGridFigure key={game.id} game={game} />;
                        })}
                    </SimpleGrid>
                }
            />
        )
    );
};

export default TrendingGamesList;
