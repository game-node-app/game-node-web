import React, { useState } from "react";
import { AspectRatio, Box, Group, Stack, Text, Title } from "@mantine/core";
import Image from "next/image";
import GameFigureImage, {
    IGameFigureProps,
} from "@/components/game/view/figure/GameFigureImage";
import useOnMobile from "@/hooks/useOnMobile";
import Link from "next/link";
import { getLocalizedFirstReleaseDate } from "@/components/game/util/getLocalizedFirstReleaseDate";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { getGameGenres } from "@/components/game/util/getGameGenres";
import {
    getGamePlatformInfo,
    IGamePlatformInfo,
} from "@/components/game/util/getGamePlatformInfo";
import GameInfoPlatformBadge from "@/components/game/info/GameInfoPlatformBadge";

interface IGameListFigureProps extends IGameFigureProps {
    game: TGameOrSearchGame;
}

const buildPlatformBadges = (platforms: IGamePlatformInfo) => {
    if (
        platforms &&
        platforms.platformsAbbreviations &&
        platforms.platformsAbbreviations.length > 0
    ) {
        return platforms.platformsAbbreviations.map(
            (platformAbbreviation, index) => {
                return (
                    <GameInfoPlatformBadge
                        key={index}
                        platform={platformAbbreviation}
                    />
                );
            },
        );
    }
    return null;
};

const GameListFigure = ({ game, ...others }: IGameListFigureProps) => {
    let name = game.name ?? "Unknown";
    const onMobile = useOnMobile();
    if (onMobile) {
        if (name.length > 30) {
            name = name.substring(0, 30) + "...";
        }
    }
    const platforms = getGamePlatformInfo(game);
    const platformAbbreviationsNames =
        platforms.platformsAbbreviations?.join(", ");
    const genres = getGameGenres(game);
    const genreNames = genres?.join(", ");

    return (
        <Group
            justify={"center"}
            align={"start"}
            w={"100%"}
            h={"100%"}
            wrap={"nowrap"}
        >
            <Box className="h-auto w-2/5 lg:w-1/6">
                <GameFigureImage
                    {...others}
                    game={game}
                    href={`/game/${game.id}`}
                    styles={{
                        root: {
                            alignItems: "baseline !important",
                            justifyContent: "start !important",
                        },
                    }}
                />
            </Box>
            <Stack
                h={"100%"}
                className="w-2/4 ms-2 !grow"
                align={"start"}
                justify="start"
            >
                <Stack gap={"xs"}>
                    <Link href={`/game/${game.id}`}>
                        <Title size="h4" className="font-bold">
                            {name}
                        </Title>
                    </Link>
                    <Text size="sm" className="text-gray-500">
                        {getLocalizedFirstReleaseDate(
                            game.firstReleaseDate,
                            undefined,
                        )}
                    </Text>
                    <Group w={"100%"} justify={"start"} wrap={"wrap"}>
                        {buildPlatformBadges(platforms)}
                    </Group>
                </Stack>

                <Text size="sm" className="text-gray-300">
                    {genreNames}
                </Text>
            </Stack>
        </Group>
    );
};

export default GameListFigure;
