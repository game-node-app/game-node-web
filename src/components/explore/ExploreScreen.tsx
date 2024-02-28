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
import ExploreScreenDrawer from "@/components/explore/ExploreScreenDrawer";
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
        criteria: undefined,
        period: period.WEEK,
    };

const SELECT_PERIOD_DATA: ComboboxItem[] = [
    { label: "Week", value: period.WEEK.valueOf() },
    { label: "Month", value: period.MONTH.valueOf() },
    {
        label: "3 months",
        value: period.QUARTER.valueOf(),
    },
    {
        label: "6 months",
        value: period.HALF_YEAR.valueOf(),
    },
    {
        label: "Year",
        value: period.YEAR.valueOf(),
    },
];

const DEFAULT_SELECT_PERIOD = period.MONTH.valueOf();

const ExploreScreen = () => {
    const [drawerOpened, drawerUtils] = useDisclosure();
    const { ref, entry } = useIntersection({
        threshold: 1,
    });
    const [scroll, scrollTo] = useWindowScroll();
    const [currentPeriod, setCurrentPeriod] = useState<string>(
        DEFAULT_SELECT_PERIOD,
    );

    const [filterDto, setFilterDto] = useURLState<
        GameRepositoryFilterDto | undefined
    >(undefined);
    const trendingGamesDto = useMemo<InfiniteQueryTrendingGamesDto>(() => {
        return {
            criteria: filterDto ?? {},
            limit: DEFAULT_EXPLORE_RESULT_LIMIT,
            period: currentPeriod as period,
        };
    }, [currentPeriod, filterDto]);
    const trendingGamesQuery = useInfiniteTrendingGames(trendingGamesDto);

    console.log(trendingGamesDto);

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
            <ExploreScreenDrawer
                setFilter={setFilterDto}
                opened={drawerOpened}
                onClose={drawerUtils.close}
            />
            <Stack className={"w-full lg:w-10/12 "}>
                <GameView layout={"grid"}>
                    <Group
                        justify={"space-between"}
                        align={"center"}
                        w={"100%"}
                    >
                        <ActionIcon
                            className="mt-4 mb-2"
                            onClick={() => drawerUtils.open()}
                        >
                            <IconAdjustments />
                        </ActionIcon>
                        <Select
                            data={SELECT_PERIOD_DATA}
                            value={currentPeriod}
                            allowDeselect={false}
                            onChange={(v) =>
                                setCurrentPeriod(v ?? period.MONTH.valueOf())
                            }
                        ></Select>
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
