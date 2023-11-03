import React, { createContext, PropsWithChildren } from "react";
import { Stack } from "@mantine/core";
import GameViewContent from "@/components/game/view/GameViewContent";
import GameViewPagination from "@/components/game/view/GameViewPagination";
import GameViewLayoutSwitcher from "@/components/game/view/GameViewLayoutSwitcher";

interface IMetadatadaViewProps extends PropsWithChildren {
    layout: "grid" | "list";
}

interface IMetadataViewContext extends Pick<IMetadatadaViewProps, "layout"> {}

export const GameViewContext = createContext<IMetadataViewContext>({
    layout: "grid",
});

const GameView = ({ children, layout = "grid" }: IMetadatadaViewProps) => {
    return (
        <GameViewContext.Provider value={{ layout: layout }}>
            {children}
        </GameViewContext.Provider>
    );
};

GameView.Content = GameViewContent;
GameView.Pagination = GameViewPagination;
GameView.LayoutSwitcher = GameViewLayoutSwitcher;

export default GameView;
