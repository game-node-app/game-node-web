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
import { sleep } from "@/util/sleep";

interface IGameInfoPlatformsProps extends GroupProps {
    gameId: number | undefined;
    ownedOnly?: boolean;
    iconsProps?: ImageProps;
}

const GameInfoPlatforms = ({
    gameId,
    iconsProps,
    ownedOnly = false,
    ...others
}: IGameInfoPlatformsProps) => {
    const onMobile = useOnMobile();
    const gameQuery = useGame(gameId, {
        relations: {
            platforms: true,
        },
    });
    const game = gameQuery.data;
    const platforms = game?.platforms;
    const iconsQuery = useQuery({
        queryKey: ["game", "platform", "icon", platforms],
        queryFn: async () => {
            if (!platforms) return [];
            const abbreviations = platforms
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
    const platformInfo = getGamePlatformInfo(game);
    const platformsNames = platformInfo.platformsAbbreviations?.join(", ");
    return (
        <Popover shadow={"md"}>
            <Popover.Target>
                <Group
                    w={"100%"}
                    justify={onMobile ? "center" : "start"}
                    wrap={"wrap"}
                    {...others}
                >
                    {!iconsQuery.isLoading && isEmpty && "Unknown"}
                    {icons}
                </Group>
            </Popover.Target>
            <Popover.Dropdown>
                <Text fz={"sm"}>{platformsNames}</Text>
            </Popover.Dropdown>
        </Popover>
    );
};

export default GameInfoPlatforms;
