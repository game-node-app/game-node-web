import React, { useMemo } from "react";
import { Game } from "@/wrapper/server";
import GameInfoPlatformBadge from "@/components/game/info/GameInfoPlatformBadge";
import { Group, GroupProps, Image, Skeleton } from "@mantine/core";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useIconNamesForGamePlatforms } from "@/components/game/hooks/useIconNamesForGamePlatforms";
import { getServerStoredIcon } from "@/util/getServerStoredImages";
import { DetailsBox } from "@/components/general/DetailsBox";

interface IGameInfoPlatformsProps extends GroupProps {
    game: Game;
}

const GameInfoPlatforms = ({ game, ...others }: IGameInfoPlatformsProps) => {
    const onMobile = useOnMobile();
    const iconsQuery = useIconNamesForGamePlatforms(game.platforms);
    const iconsImageElements = useMemo(() => {
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
                />
            );
        });
    }, [iconsQuery.data, iconsQuery.isLoading]);
    const isPlatformsEmpty =
        iconsImageElements == undefined || iconsImageElements.length === 0;
    return (
        <DetailsBox
            withBorder
            dimmedTitle
            title={"Platforms"}
            content={
                <Group
                    w={"100%"}
                    justify={"start"}
                    wrap={"wrap"}
                    className={"my-4 gap-5"}
                >
                    {isPlatformsEmpty && "Unknown"}
                    {iconsImageElements}
                </Group>
            }
        />
    );
};

export default GameInfoPlatforms;
