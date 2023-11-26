import React, { useMemo } from "react";
import { Flex, SimpleGrid, Skeleton } from "@mantine/core";
import GameGridFigure from "@/components/game/figure/GameGridFigure";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { DetailsBox } from "@/components/general/DetailsBox";
import { useTrendingItems } from "@/components/statistics/hooks/useTrendingItems";
import { useGames } from "@/components/game/hooks/useGames";

interface IProps {
    enabled: boolean;
}

export const DEFAULT_SEARCH_TRENDING_GAMES_DTO = {
    sourceType: "game",
    offset: 0,
    limit: 6,
} as const;

const GameSearchTrendingGames = ({ enabled }: IProps) => {
    const trendingGames = useTrendingItems(DEFAULT_SEARCH_TRENDING_GAMES_DTO);

    const gamesIds = trendingGames.data?.data?.map(
        (statistics) => statistics.sourceId,
    );
    const games = useGames({
        gameIds: gamesIds as unknown as number[],
        relations: {
            cover: true,
        },
    });

    const elementsSkeletons = useMemo(() => {
        return Array(DEFAULT_SEARCH_TRENDING_GAMES_DTO.limit)
            .fill(0)
            .map((v, i) => {
                return <Skeleton className={"w-auto h-[240px]"} key={i} />;
            });
    }, []);

    return (
        <Flex
            w={"100%"}
            h={"100%"}
            justify={"center"}
            display={
                !enabled || games.isError || trendingGames.isError
                    ? "none"
                    : "flex"
            }
        >
            <DetailsBox
                title={"Trending"}
                content={
                    <SimpleGrid cols={{ base: 3, lg: 6 }} h={"100%"} w={"100%"}>
                        {trendingGames.isLoading || games.isLoading
                            ? elementsSkeletons
                            : null}
                        {games.data?.data.map((game) => {
                            return (
                                <GameGridFigure
                                    key={game.id}
                                    game={game}
                                    figureProps={{ size: ImageSize.COVER_BIG }}
                                />
                            );
                        })}
                    </SimpleGrid>
                }
            />
        </Flex>
    );
};

export default GameSearchTrendingGames;
