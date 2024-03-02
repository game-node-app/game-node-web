import React, { useMemo } from "react";
import { Game } from "@/wrapper/server";
import GameInfoPlatformBadge from "@/components/game/info/GameInfoPlatformBadge";
import { Group, GroupProps, Image, Skeleton } from "@mantine/core";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useIconsForGamePlatforms } from "@/components/game/hooks/useIconsForGamePlatforms";
import { getServerStoredIcon } from "@/util/getServerStoredImages";
import { DetailsBox } from "@/components/general/DetailsBox";

interface IGameInfoPlatformsProps extends GroupProps {
    game: Game;
}

const GameInfoPlatforms = ({ game, ...others }: IGameInfoPlatformsProps) => {
    const onMobile = useOnMobile();
    const [icons, isIconsEmpty] = useIconsForGamePlatforms(game.platforms);
    return (
        <DetailsBox withBorder withDimmedTitle title={"Where to play"}>
            <Group
                w={"100%"}
                justify={onMobile ? "center" : "start"}
                wrap={"wrap"}
                className={"my-4 gap-5"}
            >
                {isIconsEmpty && "Unknown"}
                {icons}
            </Group>
        </DetailsBox>
    );
};

export default GameInfoPlatforms;
