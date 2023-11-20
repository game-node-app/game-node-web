import React, { createContext, PropsWithChildren } from "react";
import { Stack } from "@mantine/core";
import GameViewContent from "@/components/general/view/game/GameViewContent";
import GameViewPagination from "@/components/general/view/game/GameViewPagination";
import GameViewLayoutSwitcher from "@/components/general/view/game/GameViewLayoutSwitcher";

interface IGameViewProps extends PropsWithChildren {
    layout: "grid" | "list";
}

interface IGameViewContext extends Pick<IGameViewProps, "layout"> {}

export const GameViewContext = createContext<IGameViewContext>({
    layout: "grid",
});

const GameView = ({ children, layout = "grid" }: IGameViewProps) => {
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
