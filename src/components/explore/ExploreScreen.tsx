import React, { useEffect, useMemo, useState } from "react";
import {
    FindStatisticsTrendingGamesDto,
    GameRepositoryFilterDto,
} from "@/wrapper/server";
import { useURLState } from "@/components/general/hooks/useURLState";
import {
    ActionIcon,
    Affix,
    ComboboxItem,
    Group,
    Select,
    Stack,
    Transition,
} from "@mantine/core";
import {
    useDisclosure,
    useIntersection,
    useWindowScroll,
} from "@mantine/hooks";
import ExploreScreenFilters, {
    DEFAULT_EXPLORE_SCREEN_PERIOD,
} from "@/components/explore/ExploreScreenFilters";
import GameView from "@/components/general/view/game/GameView";
import { useGames } from "@/components/game/hooks/useGames";
import {
    InfiniteQueryTrendingGamesDto,
    useInfiniteTrendingGames,
} from "@/components/statistics/hooks/useInfiniteTrendingGames";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import { IconAdjustments, IconArrowUp } from "@tabler/icons-react";
import CenteredLoading from "@/components/general/CenteredLoading";
import period = FindStatisticsTrendingGamesDto.period;

export const DEFAULT_EXPLORE_RESULT_LIMIT = 20;

export const DEFAULT_EXPLORE_TRENDING_GAMES_DTO: FindStatisticsTrendingGamesDto =
    {
        limit: DEFAULT_EXPLORE_RESULT_LIMIT,
        criteria: {},
        period: DEFAULT_EXPLORE_SCREEN_PERIOD as period,
    };

const ExploreScreen = () => {
    const { ref, entry } = useIntersection({
        threshold: 1,
    });
    const [scroll, scrollTo] = useWindowScroll();
    const [currentPeriod, setCurrentPeriod] = useState<string>(
        DEFAULT_EXPLORE_SCREEN_PERIOD,
    );

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

export default ExploreScreen;
