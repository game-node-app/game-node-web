import React from "react";
import { SearchGame } from "@/components/game/search/utils/types";
import { Box, Combobox, Group, Stack, Text } from "@mantine/core";
import GameFigureImage from "@/components/game/figure/GameFigureImage";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import { getGamePlatformInfo } from "@/components/game/util/getGamePlatformInfo";
import Link from "next/link";

interface ISearchBarSelectOptions {
    game: SearchGame;
}

const SearchBarSelectOption = ({ game }: ISearchBarSelectOptions) => {
    const platforms = getGamePlatformInfo(game);
    const platformsAbbreviations = platforms.platformsAbbreviations;
    return (
        <Combobox.Option value={`${game.id}`}>
            <Link href={`/game/${game.id}`} className={"w-full h-full"}>
                <Group wrap={"nowrap"} w={"100%"} h={"100%"}>
                    <Box
                        w={{
                            base: "25vw",
                            lg: "7vw",
                        }}
                        miw={{
                            base: "25vw",
                            lg: "7vw",
                        }}
                        maw={{
                            base: "25vw",
                            lg: "7vw",
                        }}
                    >
                        <GameFigureImage
                            href={`/game/${game.id}`}
                            game={game}
                        />
                    </Box>
                    <Stack justify={"start"} h={"100%"}>
                        <Text fz={"sm"}>{game.name}</Text>
                        <Text fz={"xs"} c={"dimmed"}>
                            {platformsAbbreviations?.join(", ")}
                        </Text>
                    </Stack>
                </Group>
            </Link>
        </Combobox.Option>
    );
};

export default SearchBarSelectOption;
