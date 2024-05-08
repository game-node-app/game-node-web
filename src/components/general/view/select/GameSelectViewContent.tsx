import React, { PropsWithChildren, useMemo } from "react";
import { TGameOrSearchGame } from "@/components/game/util/types";
import { SimpleGrid, SimpleGridProps } from "@mantine/core";
import GameSelectViewFigure, {
    GameSelectViewFigureProps,
} from "@/components/general/view/select/GameSelectViewFigure";

type SelectedProps = Pick<
    GameSelectViewFigureProps,
    "onSelected" | "onDeselected"
>;

interface Props extends PropsWithChildren<SimpleGridProps & SelectedProps> {
    items: TGameOrSearchGame[];
}

const GameSelectViewContent = ({
    items,
    children,
    onSelected,
    onDeselected,
    ...others
}: Props) => {
    const columns = useMemo(() => {
        if (items == undefined || items.length === 0) {
            return null;
        }

        return items.map((game) => {
            return (
                <GameSelectViewFigure
                    key={game.id!}
                    onSelected={onSelected}
                    onDeselected={onDeselected}
                    game={game}
                />
            );
        });
    }, [items, onDeselected, onSelected]);

    return (
        <SimpleGrid
            id={"game-view-content"}
            cols={{
                base: 2,
                lg: 5,
            }}
            w={"100%"}
            h={"100%"}
            {...others}
        >
            {columns}
            {children}
        </SimpleGrid>
    );
};

export default GameSelectViewContent;
