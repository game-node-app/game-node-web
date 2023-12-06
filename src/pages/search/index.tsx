import React, { useEffect, useState } from "react";
import { Box, Container, Stack } from "@mantine/core";
import SearchBar from "@/components/general/input/SearchBar/SearchBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import GameSearchResultView from "@/components/game/search/view/result/GameSearchResultView";
import { GameSearchRequestDto } from "@/components/game/search/utils/types";
import useSearchGames from "@/components/game/hooks/useSearchGames";
import GameSearchTrendingGames, {
    DEFAULT_SEARCH_TRENDING_GAMES_DTO,
} from "@/components/game/search/view/GameSearchTrendingGames";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const SearchFormSchema = z.object({
    query: z.string().min(3),
    page: z.number().min(1).optional().default(1),
});

type TSearchFormValues = z.infer<typeof SearchFormSchema>;

const ITEMS_PER_PAGE = 20;

const DEFAULT_SEARCH_PARAMETERS: GameSearchRequestDto = {
    query: undefined,
    page: 1,
    limit: 20,
};

const urlQueryToDto = (urlQuery: ParsedUrlQuery) => {
    const searchParams = DEFAULT_SEARCH_PARAMETERS;
    const { query, page } = urlQuery;
    if (query) {
        searchParams.query = query as string;
    }
    if (page) {
        searchParams.page = Number.parseInt(page as string, 10);
    }

    return searchParams;
};

const Index = () => {
    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TSearchFormValues>({
        resolver: zodResolver(SearchFormSchema),
        mode: "onBlur",
    });
    const router = useRouter();
    const pathName = router.pathname;
    const urlQuery = router.query;

    const [searchParameters, setSearchParameters] =
        useState<GameSearchRequestDto>(DEFAULT_SEARCH_PARAMETERS);

    const isQueryEnabled =
        searchParameters.query != undefined &&
        searchParameters.query.length > 2 &&
        searchParameters.page != undefined &&
        searchParameters.page > 0;

    const searchQuery = useSearchGames(searchParameters, isQueryEnabled);

    const onSubmit = (data: TSearchFormValues) => {
        const page = data.page || 1;
        const urlParams = new URLSearchParams();
        urlParams.set("query", data.query);
        urlParams.set("page", `${page}`);
        router.push(`${pathName}?${urlParams.toString()}`);
    };

    /**
     * Effect that syncs URL query parameters with the actual request DTO
     */
    useEffect(() => {
        const searchParams = urlQueryToDto(urlQuery);
        if (searchParams.query) {
            setValue("query", searchParams.query);
            setValue("page", searchParams.page || 1);
            setSearchParameters(searchParams);
        }
    }, [setValue, urlQuery]);

    return (
        <Container
            fluid
            mih={"100%"}
            p={0}
            pos={"relative"}
            className="bg-mobile lg:bg-desktop bg-cover bg-fixed"
        >
            <Stack align="center" justify="center" w={"100%"}>
                <Box
                    className={`w-full flex justify-center h-full lg:w-5/6 mt-12 px-4`}
                >
                    <form
                        className="w-full h-full"
                        onSubmit={handleSubmit((data) => {
                            setValue("page", 1);
                            onSubmit(data);
                        })}
                    >
                        <SearchBar
                            label={"Search for games"}
                            withButton
                            error={errors.query?.message}
                            {...register("query")}
                            value={watch("query")}
                            onChange={(e) => {
                                setValue("query", e.target.value);
                            }}
                        />
                    </form>
                </Box>
                <Box className={"w-full flex justify-center h-full lg:w-5/6"}>
                    <GameSearchResultView
                        enabled={isQueryEnabled}
                        isError={searchQuery.isError}
                        isLoading={searchQuery.isLoading}
                        results={searchQuery.data?.data?.items}
                        page={watch("page")}
                        paginationInfo={searchQuery.data?.pagination}
                        onPaginationChange={(page) => {
                            setValue("page", page);
                            handleSubmit(onSubmit)();
                        }}
                    />
                    <GameSearchTrendingGames
                        enabled={searchQuery.data == undefined}
                    />
                </Box>
            </Stack>
        </Container>
    );
};

export default Index;
