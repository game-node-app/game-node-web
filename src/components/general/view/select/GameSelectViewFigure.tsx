import React, { useState } from "react";
import GameFigureImage, {
    IGameFigureProps,
} from "@/components/game/figure/GameFigureImage";
import { Overlay, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCircleCheck, IconCircleCheckFilled } from "@tabler/icons-react";

export interface GameSelectViewFigureProps extends IGameFigureProps {
    /**
     * Not to be confused with 'onSelect'!
     * @param gameId
     */
    onSelected: (gameId: number) => void;
    onDeselected: (gameId: number) => void;
}

const GameSelectViewFigure = ({
    game,
    onSelected,
    onDeselected,
    ...figureProps
}: GameSelectViewFigureProps) => {
    const [isSelected, selectedUtils] = useDisclosure();

    return (
        <GameFigureImage
            {...figureProps}
            game={game}
            onClick={(evt) => {
                evt.preventDefault();
                if (!game || !game.id) return;

                selectedUtils.toggle();
                if (isSelected) {
                    onDeselected(game.id);
                } else {
                    onSelected(game.id);
                }
            }}
        >
            {isSelected && (
                <Overlay
                    color="#000"
                    backgroundOpacity={0.85}
                    className={"z-10"}
                />
            )}
            {isSelected && (
                <IconCircleCheckFilled
                    className={
                        "absolute left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 bottom-1/2 w-8 h-8 z-20 text-brand-5"
                    }
                />
            )}
        </GameFigureImage>
    );
};

export default GameSelectViewFigure;
