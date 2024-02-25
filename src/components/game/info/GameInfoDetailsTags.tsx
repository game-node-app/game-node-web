import React, { useMemo } from "react";
import { Game } from "@/wrapper/server";
import { getGameGenres } from "@/components/game/util/getGameGenres";
import { getGameThemes } from "@/components/game/util/getGameThemes";
import { Badge, Group } from "@mantine/core";
import { getGameModes } from "@/components/game/util/getGameModes";
import { getGamePerspectives } from "@/components/game/util/getGamePerspectives";
import { shuffleArray } from "@/util/shuffleArray";

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
    game: Game | undefined;
}

/**
 * Component that shows tags (badges) of a game's genres, themes, modes, etc.
 * @param game
 * @constructor
 */
const GameInfoDetailsTags = ({ game }: IProps) => {
    const tags = useMemo(() => getCombinedTags(game), [game]);
    if (tags == undefined || tags.length === 0) return "Empty";

    return (
        <Group justify={"start"} gap={10}>
            {tags?.map((tag, index) => {
                if (!tag) return null;
                return <Badge key={index}>{tag}</Badge>;
            })}
        </Group>
    );
};

export default GameInfoDetailsTags;
