import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Container, Flex, Group, Stack } from "@mantine/core";
import SearchBar from "@/components/general/input/SearchBar/SearchBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery } from "react-query";
import GameSearchResultView from "@/components/game/search/view/result/GameSearchResultView";
import {
    GameSearchRequestDto,
    GameSearchResponseDto,
} from "@/components/game/search/utils/types";
import { SearchService } from "@/wrapper/search";
import useSearchGames from "@/components/game/hooks/useSearchGames";
import SearchBarWithSelect from "@/components/general/input/SearchBar/SearchBarWithSelect";
import GameSearchLandingView from "@/components/game/search/view/GameSearchLandingView";

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

    const searchQuery = useSearchGames(searchParameters, isQueryEnabled);

    const onSubmit = (data: TSearchFormValues, resetForm: boolean) => {
        // This will clear previous page values, preventing them from affecting other queries.
        if (resetForm) {
            setValue("page", 1);
        }
        const page = data.page || 1;
        setSearchParameters({
            ...DEFAULT_SEARCH_PARAMETERS,
            query: data.query,
            page: page,
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
            <Stack align="center" justify="center" w={"100%"}>
                <Box className={`lg:w-5/6 flex justify-center mt-12`}>
                    <form
                        className="w-full h-full"
                        onSubmit={handleSubmit((data) => onSubmit(data, true))}
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
                            handleSubmit((data) => onSubmit(data, false))();
                        }}
                    />
                    <GameSearchLandingView
                        enabled={searchQuery.data == undefined}
                    />
                </Box>
            </Stack>
        </Container>
    );
};

export default Index;
