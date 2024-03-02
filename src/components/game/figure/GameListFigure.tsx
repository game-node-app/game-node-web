import React, { PropsWithChildren, useMemo, useState } from "react";
import {
    AspectRatio,
    Box,
    Group,
    Stack,
    Text,
    Title,
    Badge,
} from "@mantine/core";
import Image from "next/image";
import GameFigureImage, {
    IGameFigureProps,
} from "@/components/game/figure/GameFigureImage";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import Link from "next/link";
import { getLocalizedFirstReleaseDate } from "@/components/game/util/getLocalizedFirstReleaseDate";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { getGameGenres } from "@/components/game/util/getGameGenres";
import {
    getGamePlatformInfo,
    IGamePlatformInfo,
} from "@/components/game/util/getGamePlatformInfo";
import GameInfoPlatformBadge from "@/components/game/info/GameInfoPlatformBadge";
import { Game } from "@/wrapper/server";
import { getGameSpecialCategoryText } from "@/components/game/util/getGameSpecialCategoryText";
import { useIconsForGamePlatforms } from "@/components/game/hooks/useIconsForGamePlatforms";

interface IGameListFigureProps extends PropsWithChildren {
    game: TGameOrSearchGame;
    figureProps?: Partial<IGameFigureProps>;
}

const GameListFigure = ({
    game,
    figureProps,
    children,
}: IGameListFigureProps) => {
    let name = game.name ?? "Unknown";
    const onMobile = useOnMobile();
    if (onMobile) {
        if (name.length > 30) {
            name = name.substring(0, 30) + "...";
        }
    }
    const platformInfo = getGamePlatformInfo(game);
    const platformsAbbreviations =
        platformInfo.platformsAbbreviations?.join(", ");
    const genres = getGameGenres(game);
    const genreNames = genres?.join(", ");
    const categoryText = useMemo(
        () => getGameSpecialCategoryText(game?.category),
        [game],
    );

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
                    game={game}
                    href={`/game/${game.id}`}
                    imageProps={{
                        styles: {
                            root: {
                                alignItems: "baseline !important",
                                justifyContent: "start !important",
                            },
                        },
                    }}
                    {...figureProps}
                >
                    {categoryText && (
                        <Badge
                            className={
                                "!absolute !w-fit !max-w-fit !max-h-fit !h-fit bg-gray-800 ml-1 mt-1"
                            }
                        >
                            {categoryText}
                        </Badge>
                    )}
                </GameFigureImage>
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
                </Stack>
                <Text size={"sm"} c={"dimmed"}>
                    {platformsAbbreviations}
                </Text>
                <Text size="sm" c={"dimmed"}>
                    {genreNames}
                </Text>
            </Stack>
        </Group>
    );
};

export default GameListFigure;
