import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
    FindStatisticsTrendingGamesDto,
    GameRepositoryFilterDto,
} from "@/wrapper/server";
import { useURLState } from "@/components/general/hooks/useURLState";
import {
    ActionIcon,
    Affix,
    Box,
    Button,
    Group,
    rem,
    ScrollArea,
    Space,
    Stack,
    Transition,
} from "@mantine/core";
import {
    useDisclosure,
    useIntersection,
    useInViewport,
    useWindowScroll,
} from "@mantine/hooks";
import ExploreScreenDrawer from "@/components/explore/ExploreScreenDrawer";
import GameView from "@/components/general/view/game/GameView";
import { useTrendingGames } from "@/components/statistics/hooks/useTrendingGames";
import { useGames } from "@/components/game/hooks/useGames";
import {
    InfiniteQueryTrendingGamesDto,
    useInfiniteTrendingGames,
} from "@/components/statistics/hooks/useInfiniteTrendingGames";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import {
    IconAdjustments,
    IconArrowUp,
    IconFilter,
    IconNavigationTop,
} from "@tabler/icons-react";
import CenteredLoading from "@/components/general/CenteredLoading";

export const DEFAULT_EXPLORE_RESULT_LIMIT = 20;

export const DEFAULT_EXPLORE_TRENDING_GAMES_DTO: FindStatisticsTrendingGamesDto =
    {
        limit: DEFAULT_EXPLORE_RESULT_LIMIT,
        criteria: undefined,
    };

const ExploreScreen = () => {
    const [layout, setLayout] = useState<"list" | "grid">("grid");

    const [drawerOpened, drawerUtils] = useDisclosure();
    const { ref, entry } = useIntersection({
        threshold: 1,
    });
    const [scroll, scrollTo] = useWindowScroll();

    const [filterDto, setFilterDto] = useURLState<
        GameRepositoryFilterDto | undefined
    >(undefined);
    const trendingGamesDto = useMemo<InfiniteQueryTrendingGamesDto>(() => {
        return {
            criteria: filterDto,
            limit: DEFAULT_EXPLORE_RESULT_LIMIT,
        };
    }, [filterDto]);
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

    useEffect(() => {
        if (
            !trendingGamesQuery.isError &&
            !trendingGamesQuery.isFetching &&
            entry?.isIntersecting
        ) {
            trendingGamesQuery.fetchNextPage();
        }
    }, [entry, trendingGamesQuery]);

    if (isLoading) {
        return <CenteredLoading />;
    }

    if (!games)
        return (
            <CenteredErrorMessage
                message={"Error while trying to fetch games"}
            />
        );

    return (
        <Stack className={"w-full"} align={"center"}>
            <ExploreScreenDrawer
                setFilter={setFilterDto}
                opened={drawerOpened}
                onClose={drawerUtils.close}
            />
            <Stack className={"w-full lg:w-10/12 "}>
                <GameView layout={layout}>
                    <Group justify={"space-between"} w={"100%"}>
                        <ActionIcon
                            className="mt-4 mb-2"
                            onClick={() => drawerUtils.open()}
                        >
                            <IconAdjustments />
                        </ActionIcon>
                        <GameView.LayoutSwitcher setLayout={setLayout} />
                    </Group>
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

export default ExploreScreen;
