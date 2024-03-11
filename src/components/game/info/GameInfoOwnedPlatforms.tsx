import React, { useMemo } from "react";
import {
    Group,
    GroupProps,
    Image,
    ImageProps,
    Popover,
    Skeleton,
    Text,
} from "@mantine/core";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { getServerStoredIcon } from "@/util/getServerStoredImages";
import { getGamePlatformInfo } from "@/components/game/util/getGamePlatformInfo";
import { useGame } from "@/components/game/hooks/useGame";
import { useQuery } from "@tanstack/react-query";
import { GameRepositoryService } from "@/wrapper/server";
import { useOwnCollectionEntryForGameId } from "@/components/collection/collection-entry/hooks/useOwnCollectionEntryForGameId";

interface IGameInfoOwnedPlatformsProps extends GroupProps {
    gameId: number | undefined;
    iconsProps?: ImageProps;
}

const GameInfoOwnedPlatforms = ({
    gameId,
    iconsProps,
    ...others
}: IGameInfoOwnedPlatformsProps) => {
    const onMobile = useOnMobile();
    const collectionEntry = useOwnCollectionEntryForGameId(gameId);
    const iconsQuery = useQuery({
        queryKey: [
            "game",
            "owned-platforms",
            "icon",
            collectionEntry.data?.ownedPlatforms,
        ],
        queryFn: () => {
            if (!collectionEntry.data?.ownedPlatforms) return [];
            const abbreviations = collectionEntry.data?.ownedPlatforms
                .map((platform) => platform?.abbreviation)
                .filter((abbreviation) => abbreviation != undefined);
            try {
                return GameRepositoryService.gameRepositoryControllerGetIconNamesForPlatformAbbreviations(
                    {
                        platformAbbreviations: abbreviations,
                    },
                );
            } catch (e) {
                console.error(e);
                return [];
            }
        },
    });

    const icons = useMemo(() => {
        const icons = iconsQuery.data;
        if (iconsQuery.isLoading)
            return new Array(4).fill(0).map((_, i) => {
                return <Skeleton key={i} className={"h-[40px] w-[56px]"} />;
            });
        if (!icons) return null;
        return icons.map((icon) => {
            return (
                <Image
                    key={icon}
                    w={60}
                    alt={icon}
                    src={getServerStoredIcon(icon)}
                    {...iconsProps}
                />
            );
        });
    }, [iconsProps, iconsQuery.data, iconsQuery.isLoading]);

    const isEmpty = icons == undefined || icons.length === 0;
    const platformsNames = collectionEntry.data?.ownedPlatforms
        .map((platform) => {
            return platform.abbreviation;
        })
        .join(", ");
    return (
        <Popover shadow={"md"}>
            <Popover.Target>
                <Group
                    w={"100%"}
                    justify={onMobile ? "center" : "start"}
                    wrap={"wrap"}
                    {...others}
                >
                    {iconsQuery.isLoading && (
                        <Skeleton className={"w-10/12 lg:w-4/12 h-10"} />
                    )}
                    {isEmpty && "Unknown"}
                    {icons}
                </Group>
            </Popover.Target>
            <Popover.Dropdown>
                <Text fz={"sm"}>{platformsNames}</Text>
            </Popover.Dropdown>
        </Popover>
    );
};

export default GameInfoOwnedPlatforms;
