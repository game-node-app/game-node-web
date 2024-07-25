import React, { useCallback, useMemo, useState } from "react";
import { CollectionEntry, Game } from "@/wrapper/server";
import { Skeleton, Stack } from "@mantine/core";
import GameView from "@/components/game/view/GameView";
import CenteredLoading from "@/components/general/CenteredLoading";
import { Box, Space } from "@mantine/core";
import GameViewLayoutSwitcher from "@/components/game/view/GameViewLayoutSwitcher";
import { IGameViewPaginationProps } from "@/components/game/view/GameViewPagination";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";

interface ICollectionEntriesViewProps extends IGameViewPaginationProps {
    isLoading: boolean;
    isError: boolean;
    games: Game[] | undefined;
}

const CollectionEntriesView = ({
    games,
    isError,
    isLoading,
    paginationInfo,
    onPaginationChange,
    page,
}: ICollectionEntriesViewProps) => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");

    const buildLoadingSkeletons = useCallback(() => {
        return new Array(4).fill(0).map((_, i) => {
            return <Skeleton key={i} className={"w-full h-60 mt-4"} />;
        });
    }, []);

    const render = () => {
        if (isError) {
            return (
                <CenteredErrorMessage
                    message={"An error occurred. Please try again."}
                />
            );
        } else if (!isLoading && (games == undefined || games.length === 0)) {
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
                    <Box className="w-full flex justify-end mb-8">
                        <Box className={"!me-4"}>
                            <GameViewLayoutSwitcher setLayout={setLayout} />
                        </Box>
                    </Box>
                    <GameView.Content items={games!}>
                        {isLoading && buildLoadingSkeletons()}
                    </GameView.Content>
                    <Space h={"2rem"} />
                    {!isLoading && !isError && (
                        <GameView.Pagination
                            page={page}
                            paginationInfo={paginationInfo}
                            onPaginationChange={onPaginationChange}
                        />
                    )}
                </Stack>
            );
        }
    };

    return <GameView layout={layout}>{render()}</GameView>;
};

export default CollectionEntriesView;
