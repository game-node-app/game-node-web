import React, { useState } from "react";
import { Box, Container, Space, Stack } from "@mantine/core";
import SearchBar from "@/components/game/search/SearchBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useQueryClient } from "react-query";
import useQueryWithParameters from "@/hooks/useQueryWithParameters";
import GameSearchResultScreen from "@/components/game/search/result/GameSearchResultScreen";
import { TPaginationResponse } from "@/util/types/pagination";
import { IBaseFindDto } from "@/util/types/baseDto";
import useInfiniteQueryWithParameters from "@/hooks/useInfiniteQueryWithParameters";
import {
    GameSearchRequestDto,
    GameSearchResponseDto,
    GameSearchResponseHits,
    GameSearchService,
    SearchGame,
} from "@/wrapper";

const SearchFormSchema = z.object({
    search: z.string().min(3),
});

type TSearchFormSchema = z.infer<typeof SearchFormSchema>;

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

const Index = () => {
    const {
        handleSubmit,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm<TSearchFormSchema>({
        resolver: zodResolver(SearchFormSchema),
        mode: "onBlur",
    });

    const [searchParameters, setSearchParameters] =
        useState<GameSearchRequestDto>(DEFAULT_SEARCH_PARAMETERS);

    const queryEnabled =
        searchParameters.query != undefined &&
        searchParameters.query["query_string"] != undefined &&
        searchParameters.query["query_string"].length > 2;

    const searchQuery = useQuery<GameSearchResponseDto>({
        queryKey: ["search", ...Object.values(searchParameters)],
        queryFn: async (ctx) => {
            return await GameSearchService.gameSearchControllerSearch(
                searchParameters,
            );
        },
        enabled: queryEnabled,
    });

    const handleSearch = (data: TSearchFormSchema) => {
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
                    enabled={queryEnabled}
                    isError={searchQuery.isError}
                    isLoading={searchQuery.isLoading}
                    isFetching={searchQuery.isFetching}
                    items={getSearchResults(searchQuery.data?.hits)}
                />
            </Container>
        </Container>
    );
};

export default Index;
