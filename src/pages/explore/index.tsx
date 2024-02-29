import React, { useEffect, useMemo, useState } from "react";
import { ActionIcon, Affix, Stack, Transition } from "@mantine/core";
import { NextPageContext } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import {
    FindStatisticsTrendingGamesDto,
    FindStatisticsTrendingReviewsDto,
    GameRepositoryFindAllDto,
    GameRepositoryService,
    StatisticsService,
} from "@/wrapper/server";
import ExploreScreenFilters, {
    DEFAULT_EXPLORE_SCREEN_PERIOD,
    exploreScreenUrlQueryToDto,
} from "@/components/explore/ExploreScreenFilters";
import period = FindStatisticsTrendingReviewsDto.period;
import { useIntersection, useWindowScroll } from "@mantine/hooks";
import { useInfiniteTrendingGames } from "@/components/statistics/hooks/useInfiniteTrendingGames";
import { useGames } from "@/components/game/hooks/useGames";
import CenteredLoading from "@/components/general/CenteredLoading";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import GameView from "@/components/general/view/game/GameView";
import { IconArrowUp } from "@tabler/icons-react";

export const DEFAULT_EXPLORE_RESULT_LIMIT = 20;

export const DEFAULT_EXPLORE_TRENDING_GAMES_DTO: FindStatisticsTrendingGamesDto =
    {
        limit: DEFAULT_EXPLORE_RESULT_LIMIT,
        criteria: {},
        period: DEFAULT_EXPLORE_SCREEN_PERIOD as period,
    };

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
    const { ref, entry } = useIntersection({
        threshold: 1,
    });
    const [scroll, scrollTo] = useWindowScroll();

    const [trendingGamesDto, setTrendingGamesDto] = useState(
        DEFAULT_EXPLORE_TRENDING_GAMES_DTO,
    );

    const trendingGamesQuery = useInfiniteTrendingGames(trendingGamesDto);

    const gamesIds = useMemo(() => {
        if (trendingGamesQuery.isError || trendingGamesQuery.data == undefined)
            return undefined;
        return trendingGamesQuery.data.pages.flatMap(
            (statisticsPaginatedResponse) => {
                return statisticsPaginatedResponse.data.map(
                    (statistics) => statistics.gameId!,
                );
            },
        );
    }, [trendingGamesQuery.data, trendingGamesQuery.isError]);

    const gamesQuery = useGames(
        {
            gameIds: gamesIds!,
            relations: {
                cover: true,
            },
        },
        true,
    );

    const games = gamesQuery.data;
    const isFetching = trendingGamesQuery.isFetching || gamesQuery.isFetching;
    const isLoading = trendingGamesQuery.isLoading || gamesQuery.isLoading;
    const isError = trendingGamesQuery.isError || gamesQuery.isError;

    useEffect(() => {
        if (!isError && !isFetching && entry?.isIntersecting) {
            trendingGamesQuery.fetchNextPage();
        }
    }, [entry, isError, isFetching, trendingGamesQuery]);

    if (isLoading) {
        return <CenteredLoading />;
    } else if (isError) {
        return (
            <CenteredErrorMessage
                message={"Error while trying to fetch games"}
            />
        );
    }

    return (
        <Stack className={"w-full"} align={"center"}>
            <Stack className={"w-full lg:w-10/12 "}>
                <GameView layout={"grid"}>
                    <ExploreScreenFilters
                        setTrendingGamesDto={setTrendingGamesDto}
                    />
                    <GameView.Content items={games!}></GameView.Content>
                </GameView>
                <div id={"last-element-ref-tracker"} ref={ref}></div>
                {isFetching && <CenteredLoading className={"mt-4 mb-4"} />}
            </Stack>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <ActionIcon
                            style={transitionStyles}
                            onClick={() => scrollTo({ y: 0 })}
                            size={"lg"}
                        >
                            <IconArrowUp />
                        </ActionIcon>
                    )}
                </Transition>
            </Affix>
        </Stack>
    );
};

export default Index;
