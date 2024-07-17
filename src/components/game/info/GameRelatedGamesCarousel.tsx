import React from "react";
import { Game } from "@/wrapper/server";
import { useGame } from "@/components/game/hooks/useGame";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoCarousel from "@/components/game/info/carousel/GameInfoCarousel";

interface GameRelatedGameCarouselProps {
    title: string;
    gameId: number;
    relationProperty: keyof Game;
}

const GameRelatedGamesCarousel = ({
    title,
    gameId,
    relationProperty,
}: GameRelatedGameCarouselProps) => {
    const gameWithRelationsQuery = useGame(gameId, {
        relations: {
            [relationProperty]: {
                cover: true,
            },
        },
    });

    const data = gameWithRelationsQuery.data;
    // Make sure to add runtime checks for an array of games too.
    const relationData = gameWithRelationsQuery.data?.[relationProperty] as
        | Game[]
        | undefined;

    const hasRelations =
        relationData != undefined &&
        Array.isArray(relationData) != undefined &&
        relationData.length > 0;

    return (
        <DetailsBox enabled={hasRelations} title={title}>
            <GameInfoCarousel
                isLoading={gameWithRelationsQuery.isLoading}
                isError={gameWithRelationsQuery.isError}
                games={relationData || []}
            />
        </DetailsBox>
    );
};

export default GameRelatedGamesCarousel;
