import React, { useMemo, useState } from "react";
import { CollectionEntry } from "@/wrapper/server";
import { Container, Stack } from "@mantine/core";
import GameView from "@/components/general/view/game/GameView";
import GameSearchResultErrorMessage from "@/components/game/search/GameSearchResultErrorMessage";
import CenteredLoading from "@/components/general/CenteredLoading";
import { Box, Space } from "@mantine/core";
import GameViewLayoutSwitcher from "@/components/general/view/game/GameViewLayoutSwitcher";
import { IGameViewPaginationProps } from "@/components/general/view/game/GameViewPagination";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";

interface ICollectionEntriesViewProps extends IGameViewPaginationProps {
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    entries: CollectionEntry[] | undefined;
}

const CollectionEntriesView = ({
    entries,
    isError,
    isLoading,
    paginationInfo,
    onPaginationChange,
    page,
}: ICollectionEntriesViewProps) => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const entriesGames = useMemo(() => {
        return entries?.map((entry) => entry.game);
    }, [entries]);

    const render = () => {
        if (isError) {
            return (
                <CenteredErrorMessage
                    message={"An error occurred. Please try again."}
                />
            );
        } else if (isLoading) {
            return <CenteredLoading />;
        } else if (
            entries == undefined ||
            entriesGames == undefined ||
            entriesGames.length === 0
        ) {
            return (
                <CenteredErrorMessage message={"This collection is empty."} />
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
                    <GameView.Content items={entriesGames} />
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

export default CollectionEntriesView;
