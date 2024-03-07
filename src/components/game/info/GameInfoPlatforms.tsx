import React, { useMemo } from "react";
import { Game } from "@/wrapper/server";
import GameInfoPlatformBadge from "@/components/game/info/GameInfoPlatformBadge";
import {
    Group,
    GroupProps,
    Image,
    Popover,
    Skeleton,
    Text,
    Tooltip,
} from "@mantine/core";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useIconsForGamePlatforms } from "@/components/game/hooks/useIconsForGamePlatforms";
import { getServerStoredIcon } from "@/util/getServerStoredImages";
import { DetailsBox } from "@/components/general/DetailsBox";
import { getGamePlatformInfo } from "@/components/game/util/getGamePlatformInfo";

interface IGameInfoPlatformsProps extends GroupProps {
    game: Game;
}

const GameInfoPlatforms = ({ game, ...others }: IGameInfoPlatformsProps) => {
    const onMobile = useOnMobile();
    const [icons, isIconsEmpty] = useIconsForGamePlatforms(game.platforms);
    const platformInfo = getGamePlatformInfo(game);
    const platformsNames = platformInfo.platformsAbbreviations?.join(", ");
    return (
        <DetailsBox withBorder withDimmedTitle title={"Where to play"}>
            <Popover shadow={"md"}>
                <Popover.Target>
                    <Group
                        w={"100%"}
                        justify={onMobile ? "center" : "start"}
                        wrap={"wrap"}
                        className={"my-4 gap-5"}
                    >
                        {isIconsEmpty && "Unknown"}
                        {icons}
                    </Group>
                </Popover.Target>
                <Popover.Dropdown>
                    <Text fz={"sm"}>{platformsNames}</Text>
                </Popover.Dropdown>
            </Popover>
        </DetailsBox>
    );
};

export default GameInfoPlatforms;
