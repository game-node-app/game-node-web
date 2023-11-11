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
} from "@/components/game/search/utils/types";
import { SearchService } from "@/wrapper/search";

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
        searchParameters.query.length > 2 &&
        searchParameters.page != undefined &&
        searchParameters.page > 0;

    const searchQuery = useQuery<GameSearchResponseDto>({
        queryKey: ["search", searchParameters],
        queryFn: async (ctx) => {
            return SearchService.postSearch(searchParameters);
        },
        keepPreviousData: true,
        enabled: isQueryEnabled,
    });

    const onSubmit = (data: TSearchFormValues) => {
        const page = data.page || 1;
        setSearchParameters({
            ...DEFAULT_SEARCH_PARAMETERS,
            query: data.query,
            page: data.page,
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
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <SearchBar
                            withButton
                            label={"Search for games"}
                            error={errors.query?.message}
                            {...register("query")}
                            value={watch("query")}
                            onChange={(e) => {
                                setValue("query", e.target.value);
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
                    results={searchQuery.data?.data?.items}
                    paginationInfo={searchQuery.data?.pagination}
                    onPaginationChange={(page) => {
                        setValue("page", page);
                        handleSubmit(onSubmit);
                    }}
                />
            </Container>
        </Container>
    );
};

export default Index;
