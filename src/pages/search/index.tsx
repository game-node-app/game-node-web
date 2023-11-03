import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Container, Stack } from "@mantine/core";
import SearchBar from "@/components/game/search/SearchBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "react-query";
import GameSearchResultScreen from "@/components/game/search/result/GameSearchResultScreen";
import {
    GameSearchRequestDto,
    GameSearchResponseDto,
    GameSearchResponseHits,
    GameSearchService,
    PaginationInfoDto,
    SearchGame,
} from "@/wrapper";

const SearchFormSchema = z.object({
    search: z.string().min(3),
});

type TSearchFormValues = z.infer<typeof SearchFormSchema>;

const ITEMS_PER_PAGE = 20;

const DEFAULT_SEARCH_PARAMETERS: GameSearchRequestDto = {
    index: GameSearchRequestDto.index.GAMENODE,
    query: {
        query_string: undefined,
    },
    limit: ITEMS_PER_PAGE,
    offset: 0,
    profile: true,
};

const getSearchResults = (
    hits: GameSearchResponseHits | undefined,
): SearchGame[] | undefined => {
    const hasResults = hits && hits.hits && hits.hits.length > 0;
    if (hasResults) {
        return hits?.hits?.map((game) => game._source);
    }

    return undefined;
};

const buildPaginationInfo = (
    response: GameSearchResponseDto | undefined,
): PaginationInfoDto => {
    const totalItems = (response && response.hits?.total) || 0;
    const currentItems = (response && response.hits?.hits?.length) || 0;
    const hasNextPage = currentItems < totalItems;
    const totalPages =
        totalItems > 0 && currentItems > 0
            ? Math.ceil(totalItems / ITEMS_PER_PAGE)
            : 1;
    return {
        total: totalItems,
        hasNextPage,
        totalPages,
    };
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

    const [searchParameters, setSearchParameters] =
        useState<GameSearchRequestDto>(DEFAULT_SEARCH_PARAMETERS);

    const isQueryEnabled =
        searchParameters.query != undefined &&
        searchParameters.query["query_string"] != undefined &&
        searchParameters.query["query_string"].length > 2;

    const searchQuery = useQuery<GameSearchResponseDto>({
        queryKey: ["search", ...Object.values(searchParameters)],
        queryFn: async (ctx) => {
            return GameSearchService.gameSearchControllerSearch(
                searchParameters,
            );
        },
        keepPreviousData: true,
        enabled: isQueryEnabled,
    });

    const searchResults = useMemo(
        () => getSearchResults(searchQuery.data?.hits),
        [searchQuery.data],
    );

    const paginationInfo = useMemo(
        () => buildPaginationInfo(searchQuery.data),
        [searchQuery.data],
    );

    const handleSearch = (data: TSearchFormValues) => {
        setSearchParameters({
            ...DEFAULT_SEARCH_PARAMETERS,
            /**
             * TODO: Add a query builder
             */
            query: {
                query_string: data.search,
            },
        });
    };

    return (
        <Container
            fluid
            mih={"100%"}
            p={0}
            pos={"relative"}
            className="bg-mobile lg:bg-desktop bg-cover bg-fixed"
        >
            <Box
                pos={"absolute"}
                h={"80vh"}
                w={"100%"}
                className=""
                style={{ zIndex: -1 }}
            ></Box>
            <Stack align="center" justify="center" w={"100%"}>
                <Box
                    className={`w-5/6 flex justify-center ${
                        searchQuery.isSuccess ? "mt-12" : "mt-[10%]"
                    }`}
                >
                    <form
                        className="w-full h-full"
                        onSubmit={handleSubmit(handleSearch)}
                    >
                        <SearchBar
                            withButton
                            label={"Search for games"}
                            error={errors.search?.message}
                            {...register("search")}
                            value={watch("search")}
                            onChange={(e) => {
                                setValue("search", e.target.value);
                            }}
                        />
                    </form>
                </Box>
            </Stack>
            <Container fluid my={"3rem"}>
                <GameSearchResultScreen
                    enabled={isQueryEnabled}
                    isError={searchQuery.isError}
                    isLoading={searchQuery.isLoading}
                    isFetching={searchQuery.isFetching}
                    results={searchResults}
                    paginationInfo={paginationInfo}
                    onPaginationChange={(page) => {
                        setSearchParameters({
                            ...searchParameters,
                            offset: (page - 1) * ITEMS_PER_PAGE,
                        });
                    }}
                />
            </Container>
        </Container>
    );
};

export default Index;
