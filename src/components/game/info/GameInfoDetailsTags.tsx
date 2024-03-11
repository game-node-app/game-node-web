import React, { useMemo } from "react";
import { Game } from "@/wrapper/server";
import { getGameGenres } from "@/components/game/util/getGameGenres";
import { getGameThemes } from "@/components/game/util/getGameThemes";
import { Badge, Group, Skeleton } from "@mantine/core";
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
    const hasTags = tags != undefined && tags.length > 0;
    return (
        <DetailsBox withBorder withDimmedTitle title={"Tags"}>
            <Group justify={"start"} gap={10}>
                {gameQuery.isLoading && (
                    <Skeleton className={"w-10/12 lg:w-4/12 h-4"}></Skeleton>
                )}
                {hasTags &&
                    tags?.map((tag, index) => {
                        if (!tag) return null;
                        return <Badge key={index}>{tag}</Badge>;
                    })}
            </Group>
        </DetailsBox>
    );
};

export default GameInfoDetailsTags;
