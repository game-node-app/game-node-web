import React from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import { Game } from "@/wrapper/server";
import { getLocalizedFirstReleaseDate } from "@/components/game/util/getLocalizedFirstReleaseDate";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoPlatforms from "@/components/game/info/GameInfoPlatforms";
import GameInfoDetailsDeveloperInfo from "@/components/game/info/GameInfoDetailsDeveloperInfo";
import GameInfoDetailsTags from "@/components/game/info/GameInfoDetailsTags";

interface IGameInfoDetailsProps {
    game: Game | undefined;
}

const GameInfoDetails = ({ game }: IGameInfoDetailsProps) => {
    if (!game) {
        return null;
    }

    return (
        <Stack align={"start"} justify={"start"} gap={"0.5rem"}>
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <DetailsBox
                    withBorder
                    dimmedTitle
                    title={"Launch date"}
                    content={getLocalizedFirstReleaseDate(
                        game.firstReleaseDate,
                    )}
                />
                <GameInfoDetailsDeveloperInfo gameId={game.id} />
                <DetailsBox
                    withBorder
                    dimmedTitle
                    title={"Tags"}
                    content={<GameInfoDetailsTags game={game} />}
                />
                <DetailsBox
                    withBorder
                    dimmedTitle
                    title={"Summary"}
                    content={game.summary}
                />
                <GameInfoPlatforms game={game} />
            </SimpleGrid>
        </Stack>
    );
};

export default GameInfoDetails;
