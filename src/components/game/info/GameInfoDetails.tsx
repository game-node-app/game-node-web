import React from "react";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import { Game, GameRepositoryFindOneDto } from "@/wrapper/server";
import { getLocalizedFirstReleaseDate } from "@/components/game/util/getLocalizedFirstReleaseDate";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoPlatforms from "@/components/game/info/GameInfoPlatforms";
import GameInfoDetailsDeveloperInfo from "@/components/game/info/GameInfoDetailsDeveloperInfo";
import GameInfoDetailsTags from "@/components/game/info/GameInfoDetailsTags";
import GameInfoScore from "@/components/game/info/GameInfoScore";

interface IGameInfoDetailsProps {
    game: Game | undefined;
}

const GameInfoDetails = ({ game }: IGameInfoDetailsProps) => {
    if (!game || game == undefined) {
        return null;
    }

    return (
        <Stack align={"start"} justify={"start"} gap={"0.5rem"}>
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <DetailsBox withBorder withDimmedTitle title={"Launch date"}>
                    {getLocalizedFirstReleaseDate(game.firstReleaseDate) ??
                        "Unknown"}
                </DetailsBox>
                <DetailsBox withBorder withDimmedTitle title={"Summary"}>
                    {game.summary ?? "Unknown"}
                </DetailsBox>
                <GameInfoDetailsDeveloperInfo gameId={game.id} />
                <GameInfoDetailsTags gameId={game.id} />
                <GameInfoPlatforms gameId={game.id} />
                <GameInfoScore gameId={game.id} />
            </SimpleGrid>
        </Stack>
    );
};

export default GameInfoDetails;
