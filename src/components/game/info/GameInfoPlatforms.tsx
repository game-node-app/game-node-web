import React from "react";
import { Game, GamePlatform } from "@/wrapper";
import GameInfoPlatformBadge from "@/components/game/info/GameInfoPlatformBadge";
import { Group, GroupProps } from "@mantine/core";
import {
    IconBrandWindows,
    IconBrandXbox,
    IconPlaystationTriangle,
} from "@tabler/icons-react";

interface IGameInfoPlatformsProps extends GroupProps {
    game: Game;
}

const buildBadges = (game: Game) => {
    const platforms = game.platforms;
    const badges = platforms?.map((platform, index) => {
        const platformName = platform.abbreviation;
        return (
            <GameInfoPlatformBadge
                key={index}
                platform={platformName}
                className={"w-28 mx-2"}
            />
        );
    });
    return badges;
};

const GameInfoPlatforms = ({ game, ...others }: IGameInfoPlatformsProps) => {
    return (
        <Group {...others} w={"100%"} justify={"center"} wrap={"wrap"}>
            {buildBadges(game)}
        </Group>
    );
};

export default GameInfoPlatforms;
