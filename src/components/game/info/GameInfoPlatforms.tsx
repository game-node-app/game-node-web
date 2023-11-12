import React from "react";
import { Game } from "@/wrapper/server";
import GameInfoPlatformBadge from "@/components/game/info/GameInfoPlatformBadge";
import { Group, GroupProps } from "@mantine/core";

interface IGameInfoPlatformsProps extends GroupProps {
    game: Game;
}

const buildBadges = (game: Game) => {
    const platforms = game.platforms;
    if (platforms == undefined || platforms.length === 0) {
        return "Unknown";
    }
    return platforms?.map((platform, index) => {
        const platformName = platform.abbreviation;
        return (
            <GameInfoPlatformBadge
                key={index}
                platform={platformName}
                className={"w-28 mx-2"}
            />
        );
    });
};

const GameInfoPlatforms = ({ game, ...others }: IGameInfoPlatformsProps) => {
    return (
        <Group {...others} w={"100%"} justify={"center"} wrap={"wrap"}>
            {buildBadges(game)}
        </Group>
    );
};

export default GameInfoPlatforms;
