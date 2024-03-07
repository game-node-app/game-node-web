import React, { useMemo } from "react";
import { Game } from "@/wrapper/server";
import { getGameGenres } from "@/components/game/util/getGameGenres";
import { getGameThemes } from "@/components/game/util/getGameThemes";
import { Badge, Group } from "@mantine/core";
import { getGameModes } from "@/components/game/util/getGameModes";
import { getGamePerspectives } from "@/components/game/util/getGamePerspectives";
import { shuffleArray } from "@/util/shuffleArray";
import { DetailsBox } from "@/components/general/DetailsBox";
import { useGame } from "@/components/game/hooks/useGame";
import CenteredLoading from "@/components/general/CenteredLoading";

const getCombinedTags = (game?: Game) => {
    if (!game) return undefined;
    const genres = getGameGenres(game);
    const themes = getGameThemes(game);
    const modes = getGameModes(game)?.map((mode) => mode.name);
    const perspectives = getGamePerspectives(game)?.map(
        (perspective) => perspective.name,
    );
    const tags = [genres, themes, modes, perspectives];
    const flatTags = tags.flat();
    const filteredTags = flatTags.filter((item) => item != undefined);
    return filteredTags;
};

interface IProps {
    gameId: number | undefined;
}

/**
 * Component that shows tags (badges) of a game's genres, themes, modes, etc.
 * @param game
 * @constructor
 */
const GameInfoDetailsTags = ({ gameId }: IProps) => {
    const gameQuery = useGame(gameId, {
        relations: {
            genres: true,
            gameModes: true,
            themes: true,
        },
    });
    const game = gameQuery.data;
    const tags = useMemo(() => getCombinedTags(game), [game]);
    if (gameQuery.isLoading) {
        return <CenteredLoading />;
    }
    if (tags == undefined || tags.length === 0) return "Empty";

    return (
        <DetailsBox withBorder withDimmedTitle title={"Tags"}>
            <Group justify={"start"} gap={10}>
                {tags?.map((tag, index) => {
                    if (!tag) return null;
                    return <Badge key={index}>{tag}</Badge>;
                })}
            </Group>
        </DetailsBox>
    );
};

export default GameInfoDetailsTags;
