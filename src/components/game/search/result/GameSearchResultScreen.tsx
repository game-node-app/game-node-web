import React, { useEffect, useMemo, useRef, useState } from "react";
import GameView from "@/components/game/view/GameView";
import { Box, Container, Space, Stack } from "@mantine/core";
import GameSearchResultErrorMessage from "@/components/game/search/result/GameSearchResultErrorMessage";
import CenteredLoading from "@/components/general/CenteredLoading";
import GameViewLayoutSwitcher from "@/components/game/view/GameViewLayoutSwitcher";
import { SearchGame } from "@/wrapper/server";
import { IGameViewPaginationProps } from "@/components/game/view/GameViewPagination";

interface ISearchResultScreenProps extends IGameViewPaginationProps {
    enabled: boolean;
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    results: SearchGame[] | undefined;
}

const GameSearchResultScreen = ({
    enabled,
    isError,
    isLoading,
    results,
    paginationInfo,
    onPaginationChange,
}: ISearchResultScreenProps) => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");

    const render = () => {
        if (!enabled) {
            return null;
        }
        if (isError) {
            return (
                <GameSearchResultErrorMessage
                    message={"An error occurred. Please try again."}
                />
            );
        } else if (isLoading) {
            return <CenteredLoading />;
        } else if (results == undefined || results.length === 0) {
            return (
                <GameSearchResultErrorMessage
                    message={"No results found. Please try again."}
                />
            );
        } else {
            return (
                <Stack
                    w={"100%"}
                    justify={"space-between"}
                    h={"100%"}
                    mt={"md"}
                >
                    <Box className="w-full flex justify-end mb-8 ">
                        <Box className={"!me-4"}>
                            <GameViewLayoutSwitcher setLayout={setLayout} />
                        </Box>
                    </Box>
                    <GameView.Content items={results} />
                    <Space h={"2rem"} />
                    <GameView.Pagination
                        paginationInfo={paginationInfo}
                        onPaginationChange={onPaginationChange}
                    />
                </Stack>
            );
        }
    };

    return <GameView layout={layout}>{render()}</GameView>;
};

export default GameSearchResultScreen;
