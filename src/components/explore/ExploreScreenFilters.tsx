import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { z } from "zod";
import {
    FindStatisticsTrendingGamesDto,
    FindStatisticsTrendingReviewsDto,
    GameRepositoryFilterDto,
} from "@/wrapper/server";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    ActionIcon,
    Button,
    Center,
    ComboboxItem,
    Drawer,
    Group,
    Select,
    SimpleGrid,
    Stack,
} from "@mantine/core";
import ExploreScreenResourceSelector from "@/components/explore/ExploreScreenResourceSelector";
import { useRouter } from "next/router";
import { IconAdjustments } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import period = FindStatisticsTrendingReviewsDto.period;
import { InfiniteQueryTrendingGamesDto } from "@/components/statistics/hooks/useInfiniteTrendingGames";
import { ParsedUrlQuery } from "querystring";
import { DEFAULT_EXPLORE_TRENDING_GAMES_DTO } from "@/components/explore/ExploreScreen";

export const DEFAULT_EXPLORE_SCREEN_PERIOD = period.MONTH.valueOf();

// @ts-ignore
const FilterFormSchema = z.object({
    themes: z.array(z.string()).optional(),
    genres: z.array(z.string()).optional(),
    platforms: z.array(z.string()).optional(),
    category: z.string().optional(),
    gameModes: z.array(z.string()).optional(),
    status: z.string().optional(),
    period: z.string().default(DEFAULT_EXPLORE_SCREEN_PERIOD),
});

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

type FilterFormValues = z.infer<typeof FilterFormSchema>;

interface Props {
    setTrendingGamesDto: Dispatch<
        SetStateAction<FindStatisticsTrendingGamesDto>
    >;
}

/**
 * PS: DO NOT use this as 'data' for the MultiSelect component. This is only for reference when building the JSX below.
 */
const resources: ComboboxItem[] = [
    {
        label: "Themes",
        value: "themes",
    },
    {
        label: "Genres",
        value: "genres",
    },
    {
        label: "Platforms",
        value: "platforms",
    },
    {
        label: "Modes",
        value: "gameModes",
    },
];

export const exploreScreenUrlQueryToDto = (query: ParsedUrlQuery) => {
    const dto: FindStatisticsTrendingGamesDto =
        DEFAULT_EXPLORE_TRENDING_GAMES_DTO;
    for (const [k, v] of Object.entries(query)) {
        if (k !== "period" && typeof v === "string") {
            if (v.includes(",")) {
                //@ts-ignore
                dto.criteria[k] = v.split(",");
            } else {
                //@ts-ignore
                dto.criteria[k] = [v];
            }
        } else if (typeof v === "string") {
            // @ts-ignore
            dto[k] = v;
        }
    }
    return dto;
};

export const exploreScreenDtoToSearchParams = (
    dto: FindStatisticsTrendingGamesDto,
) => {
    const params = new URLSearchParams();
    const { period, criteria } = dto;
    params.set("period", period);
    if (criteria) {
        for (const [k, v] of Object.entries(criteria)) {
            params.set(k, `${v}`);
        }
    }
    return params;
};

const ExploreScreenFilters = ({ setTrendingGamesDto }: Props) => {
    const router = useRouter();
    const [drawerOpened, drawerUtils] = useDisclosure();

    const hasSetInitialUrlParams = useRef(false);
    const { handleSubmit, register, setValue, watch, formState } =
        useForm<FilterFormValues>({
            resolver: zodResolver(FilterFormSchema),
            mode: "onBlur",
            defaultValues: {
                period: DEFAULT_EXPLORE_SCREEN_PERIOD,
            },
        });

    const onSubmit = (data: FilterFormValues) => {
        const { period, ...criteria } = data;
        setTrendingGamesDto((previousState) => {
            const updatedState = {
                ...previousState,
                period: period as period,
                criteria:
                    (criteria as GameRepositoryFilterDto) ??
                    previousState.criteria,
            };
            const searchParams = exploreScreenDtoToSearchParams(updatedState);
            router.replace(
                {
                    query: searchParams.toString(),
                },
                undefined,
                { shallow: true },
            );
            return updatedState;
        });
        drawerUtils.close();
    };

    useEffect(() => {
        const query = router.query;
        if (router.isReady && !hasSetInitialUrlParams.current) {
            const dto = exploreScreenUrlQueryToDto(query);
            for (const [k, v] of Object.entries(dto)) {
                setValue(k as any, `${v}`);
            }
            setTrendingGamesDto(dto);
            hasSetInitialUrlParams.current = true;
        }
    }, [router.isReady, router.query, setTrendingGamesDto, setValue]);

    return (
        <Group justify={"space-between"} align={"center"} w={"100%"}>
            <Drawer
                onClose={drawerUtils.close}
                opened={drawerOpened}
                title={"Filters"}
            >
                <form
                    className={"w-full h-full"}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <SimpleGrid cols={2}>
                        {resources.map((resourceReference) => {
                            const valueName = resourceReference.value as any;
                            return (
                                <ExploreScreenResourceSelector
                                    label={resourceReference.label}
                                    key={valueName}
                                    resourceName={valueName}
                                    value={watch(valueName)}
                                    onChange={(value) => {
                                        setValue(valueName, value);
                                    }}
                                />
                            );
                        })}
                    </SimpleGrid>
                    <Center className={"mt-8"}>
                        <Button type="submit" loading={formState.isSubmitting}>
                            Filter
                        </Button>
                    </Center>
                </form>
            </Drawer>
            <ActionIcon
                className="mt-4 mb-2"
                onClick={() => drawerUtils.open()}
            >
                <IconAdjustments />
            </ActionIcon>
            <Select
                {...register("period")}
                data={SELECT_PERIOD_DATA}
                value={watch("period")}
                allowDeselect={false}
                onChange={(v) => {
                    const value = v ?? period.MONTH.valueOf();
                    setValue("period", value);
                    onSubmit({
                        period: value,
                    });
                }}
            ></Select>
        </Group>
    );
};

export default ExploreScreenFilters;