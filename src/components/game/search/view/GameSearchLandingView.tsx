import React, { useMemo } from "react";
import { Flex, SimpleGrid, Skeleton } from "@mantine/core";
import GameGridFigure from "@/components/game/figure/GameGridFigure";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/hooks/useOnMobile";
import { DetailsBox } from "@/components/general/DetailsBox";
import { useTrendingItems } from "@/components/statistics/hooks/useTrendingItems";
import { useGames } from "@/components/game/hooks/useGames";

interface IProps {
    enabled: boolean;
}

const GameSearchLandingView = ({ enabled }: IProps) => {
    const limit = 6;
    const trendingGames = useTrendingItems({
        sourceType: "game",
        offset: 0,
        limit,
    });

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
        return Array(limit)
            .fill(0)
            .map((v, i) => {
                return <Skeleton className={"w-auto h-[240px]"} key={i} />;
            });
    }, [limit]);

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

export default GameSearchLandingView;
