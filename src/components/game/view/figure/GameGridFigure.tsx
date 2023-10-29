import React from "react";
import GameFigureImage, {
    IGameFigureProps,
} from "@/components/game/view/figure/GameFigureImage";

interface IGameGridFigureProps extends IGameFigureProps {}

const GameGridFigure = ({ game, ...others }: IGameGridFigureProps) => {
    return (
        <GameFigureImage {...others} game={game} href={`/game/${game?.id}`} />
    );
};

export default GameGridFigure;
