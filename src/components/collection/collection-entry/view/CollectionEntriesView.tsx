import React, { useMemo, useState } from "react";
import { CollectionEntry } from "@/wrapper/server";
import { Container, Stack } from "@mantine/core";
import GameView from "@/components/general/view/game/GameView";
import GameSearchResultErrorMessage from "@/components/game/search/result/GameSearchResultErrorMessage";
import CenteredLoading from "@/components/general/CenteredLoading";
import { Box, Space } from "@mantine/core";
import GameViewLayoutSwitcher from "@/components/general/view/game/GameViewLayoutSwitcher";
import { IGameViewPaginationProps } from "@/components/general/view/game/GameViewPagination";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { getGamePlatformInfo } from "@/components/game/util/getGamePlatformInfo";
import GameInfoPlatformBadge from "@/components/game/info/GameInfoPlatformBadge";

interface ICollectionEntriesViewProps extends IGameViewPaginationProps {
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    entries: CollectionEntry[] | undefined;
}

const badgesBuilder = (
    game: TGameOrSearchGame,
    entries: CollectionEntry[] | undefined,
) => {
    if (entries == undefined || entries.length === 0) return null;
    const relevantEntry = entries.find((entry) => entry.game.id === game.id);
    if (relevantEntry == undefined) return null;
    const ownedPlatforms = relevantEntry.ownedPlatforms;
    const platformInfo = getGamePlatformInfo(game);
    if (
        platformInfo.platformsAbbreviations == undefined ||
        platformInfo.platformsAbbreviations.length === 0
    ) {
        return null;
    }

    const sortedPlatformsAbbreviations =
        platformInfo.platformsAbbreviations?.toSorted((a, b) => {
            if (
                ownedPlatforms.some((platform) => platform.abbreviation === a)
            ) {
                return -1;
            }
            return 1;
        });

    return sortedPlatformsAbbreviations.map((platformAbbreviation, index) => {
        const isPlatformOwned =
            platformInfo.platformsIds &&
            ownedPlatforms.some(
                (ownedPlatform) =>
                    ownedPlatform.abbreviation === platformAbbreviation,
            );
        return (
            <GameInfoPlatformBadge
                key={index}
                platformAbbreviation={platformAbbreviation}
                color={isPlatformOwned ? undefined : "gray"}
            />
        );
    });
};

const CollectionEntriesView = ({
    entries,
    isError,
    isLoading,
    paginationInfo,
    onPaginationChange,
}: ICollectionEntriesViewProps) => {
    const [layout, setLayout] = useState<"grid" | "list">("grid");
    const entriesGames = useMemo(() => {
        return entries?.map((entry) => entry.game);
    }, [entries]);
    const platformBadges = useMemo(() => {
        if (entriesGames == undefined || entriesGames.length === 0)
            return undefined;
    }, [entriesGames]);

    const render = () => {
        if (isError) {
            return (
                <GameSearchResultErrorMessage
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
                    <GameView.Content
                        items={entriesGames}
                        badgesBuilder={(game) => badgesBuilder(game, entries)}
                    />
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

export default CollectionEntriesView;
