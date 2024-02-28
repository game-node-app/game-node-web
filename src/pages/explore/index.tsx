import React from "react";
import ExploreScreen, {
    DEFAULT_EXPLORE_TRENDING_GAMES_DTO,
} from "@/components/explore/ExploreScreen";
import { ScrollArea } from "@mantine/core";
import { NextPageContext } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
    GameRepositoryFindAllDto,
    GameRepositoryService,
    StatisticsService,
} from "@/wrapper/server";

export const getServerSideProps = async (context: NextPageContext) => {
    const queryClient = new QueryClient();
    let gameIds: number[] | undefined = undefined;
    await queryClient.prefetchInfiniteQuery({
        queryKey: [
            "statistics",
            "trending",
            "game",
            "infinite",
            DEFAULT_EXPLORE_TRENDING_GAMES_DTO.limit,
            DEFAULT_EXPLORE_TRENDING_GAMES_DTO.period,
            DEFAULT_EXPLORE_TRENDING_GAMES_DTO.criteria,
        ],
        queryFn: async () => {
            const response =
                await StatisticsService.statisticsControllerFindTrendingGames(
                    DEFAULT_EXPLORE_TRENDING_GAMES_DTO,
                );
            if (response && response.data) {
                gameIds = response.data.map((s) => s.gameId!);
            }
            return response;
        },
        initialPageParam: 0,
    });

    if (gameIds) {
        const useGamesDto: GameRepositoryFindAllDto = {
            gameIds: gameIds,
            relations: {
                cover: true,
            },
        };

        await queryClient.prefetchQuery({
            queryKey: ["game", "all", useGamesDto],
            queryFn: () => {
                return GameRepositoryService.gameRepositoryControllerFindAllByIds(
                    useGamesDto,
                );
            },
        });
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

const Index = () => {
    return <ExploreScreen />;
};

export default Index;
