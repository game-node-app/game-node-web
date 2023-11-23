import React, { useMemo } from "react";
import GameFigureImage, {
    IGameFigureProps,
} from "@/components/game/figure/GameFigureImage";
import { Badge } from "@mantine/core";
import { getGameSpecialCategoryText } from "@/components/game/util/getGameSpecialCategoryText";
import { TGameOrSearchGame } from "@/components/game/util/types";

interface IGameGridFigureProps {
    game: TGameOrSearchGame;
    figureProps?: Partial<IGameFigureProps>;
}

const GameGridFigure = ({ game, figureProps }: IGameGridFigureProps) => {
    const categoryText = useMemo(
        () => getGameSpecialCategoryText(game?.category),
        [game],
    );
    return (
        <GameFigureImage
            {...figureProps}
            game={game}
            href={`/game/${game?.id}`}
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
    );
};

export default GameGridFigure;
