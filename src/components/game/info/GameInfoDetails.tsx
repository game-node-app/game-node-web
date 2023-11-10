import React from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import { Game } from "@/wrapper/server";
import { getLocalizedFirstReleaseDate } from "@/components/game/util/getLocalizedFirstReleaseDate";
import { getGameGenres } from "@/components/game/util/getGameGenres";
import GameInfoImageCarousel from "@/components/game/info/carousel/GameInfoImageCarousel";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/hooks/useOnMobile";
import { GameInfoDetailsBox } from "@/components/game/info/GameInfoDetailsBox";
import GameInfoPlatforms from "@/components/game/info/GameInfoPlatforms";

interface IGameInfoDetailsProps {
    game: Game | undefined;
}

const GameInfoDetails = ({ game }: IGameInfoDetailsProps) => {
    const onMobile = useOnMobile();
    if (!game) {
        return null;
    }
    const genres = getGameGenres(game);
    const genresNames = genres?.join(", ");

    return (
        <Stack align={"start"} justify={"start"} gap={"0.5rem"}>
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <GameInfoDetailsBox
                    title={"Launch date"}
                    content={getLocalizedFirstReleaseDate(
                        game.firstReleaseDate,
                        "pt-BR",
                    )}
                />
                <GameInfoDetailsBox
                    title={"Developer(s)"}
                    content={undefined}
                />
                <GameInfoDetailsBox
                    title={"Publisher(s)"}
                    content={undefined}
                />
                <GameInfoDetailsBox title={"Genres"} content={genresNames} />
                <GameInfoDetailsBox title={"Summary"} content={game.summary} />
                <GameInfoDetailsBox
                    title={"Platforms"}
                    content={
                        <GameInfoPlatforms
                            className={"my-4 gap-2"}
                            game={game}
                        />
                    }
                />
            </SimpleGrid>
        </Stack>
    );
};

export default GameInfoDetails;
