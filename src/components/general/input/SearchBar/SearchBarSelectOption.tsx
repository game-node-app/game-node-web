import React from "react";
import { SearchGame } from "@/components/game/search/utils/types";
import {
    Box,
    Combobox,
    ComboboxStore,
    Flex,
    Group,
    Stack,
    Text,
} from "@mantine/core";
import GameFigureImage from "@/components/game/view/figure/GameFigureImage";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import { getGamePlatformInfo } from "@/components/game/util/getGamePlatformInfo";
import { useRouter } from "next/router";

interface ISearchBarSelectOptions {
    game: SearchGame;
}

const SearchBarSelectOption = ({ game }: ISearchBarSelectOptions) => {
    const router = useRouter();
    const platforms = getGamePlatformInfo(game);
    const platformsAbbreviations = platforms.platformsAbbreviations;
    return (
        <Combobox.Option value={`${game.id}`}>
            <Group wrap={"nowrap"} w={"100%"} h={"100%"}>
                <Box
                    w={{
                        base: "25vw",
                        lg: "10vw",
                    }}
                    miw={{
                        base: "25vw",
                        lg: "10vw",
                    }}
                    maw={{
                        base: "25vw",
                        lg: "10vw",
                    }}
                >
                    <GameFigureImage
                        href={"#"}
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        game={game}
                        size={ImageSize.COVER_BIG}
                    />
                </Box>
                <Stack justify={"start"} h={"100%"}>
                    <Text fz={"sm"}>{game.name}</Text>
                    <Text fz={"xs"} c={"dimmed"}>
                        {platformsAbbreviations?.join(", ")}
                    </Text>
                </Stack>
            </Group>
        </Combobox.Option>
    );
};

export default SearchBarSelectOption;
