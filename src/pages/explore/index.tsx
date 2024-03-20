import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActionIcon,
    Affix,
    Group,
    Skeleton,
    Stack,
    Transition,
} from "@mantine/core";
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
    const query = context.query;
    const queryDto = exploreScreenUrlQueryToDto(query);
    const isDefaultDto =
        JSON.stringify(DEFAULT_EXPLORE_TRENDING_GAMES_DTO) ===
        JSON.stringify(queryDto);
    const queryClient = new QueryClient();
    let gameIds: number[] | undefined = undefined;
    /**
     * Only attempts to pre-fetch when the default page is loaded; Prevents hydration errors.
     */
    if (isDefaultDto) {
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
    const [hasLoadedQueryParams, setHasLoadedQueryParams] =
        useState<boolean>(false);
    const [trendingGamesDto, setTrendingGamesDto] = useState(
        DEFAULT_EXPLORE_TRENDING_GAMES_DTO,
    );

    const trendingGamesQuery = useInfiniteTrendingGames(
        trendingGamesDto,
        hasLoadedQueryParams,
    );

    const gamesIds = useMemo(() => {
        if (trendingGamesQuery.isError || trendingGamesQuery.data == undefined)
            return undefined;
        return trendingGamesQuery.data?.pages.flatMap(
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

    const isFetching =
        trendingGamesQuery.isFetching ||
        trendingGamesQuery.isFetchingNextPage ||
        trendingGamesQuery.isPending ||
        trendingGamesQuery.isFetchingPreviousPage ||
        gamesQuery.isFetching;
    const isLoading = trendingGamesQuery.isLoading || gamesQuery.isLoading;
    const isError = trendingGamesQuery.isError || gamesQuery.isError;

    const buildLoadingSkeletons = useCallback(() => {
        return new Array(10).fill(0).map((v, i) => {
            return <Skeleton key={i} className={"w-40 lg:w-48 h-60 mt-4"} />;
        });
    }, []);

    useEffect(() => {
        const lastElement =
            trendingGamesQuery.data?.pages[
                trendingGamesQuery.data?.pages.length - 1
            ];
        const canFetchNextPage =
            !isError &&
            !isFetching &&
            !isLoading &&
            lastElement != undefined &&
            lastElement.pagination.hasNextPage;
        if (canFetchNextPage && entry?.isIntersecting) {
            trendingGamesQuery.fetchNextPage({ cancelRefetch: false });
        }
    }, [entry, isError, isFetching, isLoading, trendingGamesQuery]);

    if (isError) {
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
                        hasLoadedQueryParams={hasLoadedQueryParams}
                        setHasLoadedQueryParams={setHasLoadedQueryParams}
                        setTrendingGamesDto={setTrendingGamesDto}
                        invalidateQuery={trendingGamesQuery.invalidate}
                    />
                    <GameView.Content items={games!}>
                        {isFetching && buildLoadingSkeletons()}
                    </GameView.Content>
                </GameView>

                <div id={"last-element-ref-tracker"} ref={ref}></div>
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
