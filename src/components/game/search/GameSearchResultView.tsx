import React, { useEffect, useMemo, useRef, useState } from "react";
import GameView from "@/components/general/view/game/GameView";
import { Box, Container, Flex, Space, Stack } from "@mantine/core";
import CenteredLoading from "@/components/general/CenteredLoading";
import GameViewLayoutSwitcher from "@/components/general/view/game/GameViewLayoutSwitcher";
import { IGameViewPaginationProps } from "@/components/general/view/game/GameViewPagination";
import { SearchGame } from "@/components/game/search/utils/types";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";

interface ISearchResultScreenProps extends IGameViewPaginationProps {
    enabled: boolean;
    isLoading: boolean;
    isError: boolean;
    results: SearchGame[] | undefined;
}

const GameSearchResultView = ({
    enabled,
    isError,
    isLoading,
    results,
    paginationInfo,
    onPaginationChange,
    page,
}: ISearchResultScreenProps) => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");

    const render = () => {
        if (!enabled) {
            return null;
        }
        if (isError) {
            return (
                <CenteredErrorMessage
                    message={"An error occurred. Please try again."}
                />
            );
        } else if (isLoading) {
            return <CenteredLoading />;
        } else if (results == undefined || results.length === 0) {
            return (
                <CenteredErrorMessage
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
                    <Box className="w-full flex justify-end mb-8">
                        <GameView.LayoutSwitcher setLayout={setLayout} />
                    </Box>

                    <GameView.Content items={results} />

                    <Space h={"2rem"} />
                    <GameView.Pagination
                        page={page}
                        paginationInfo={paginationInfo}
                        onPaginationChange={onPaginationChange}
                    />
                </Stack>
            );
        }
    };

    return <GameView layout={layout}>{render()}</GameView>;
};

export default GameSearchResultView;
