import React, { createContext, PropsWithChildren } from "react";
import { Stack } from "@mantine/core";
import GameViewContent from "@/components/game/view/GameViewContent";
import GameViewPagination from "@/components/game/view/GameViewPagination";
import GameViewLayoutSwitcher from "@/components/game/view/GameViewLayoutSwitcher";

interface IMetadatadaViewProps
    extends PropsWithChildren<React.ComponentProps<typeof Stack>> {
    layout: "grid" | "list";
}

interface IMetadataViewContext extends Omit<IMetadatadaViewProps, "children"> {}

export const GameViewContext = createContext<IMetadataViewContext>({
    layout: "grid",
});

const GameView = ({
    children,
    layout = "grid",
    ...others
}: IMetadatadaViewProps) => {
    return (
        <GameViewContext.Provider value={{ layout: layout }}>
            <Stack
                w={"100%"}
                align="center"
                justify="start"
                h={"100%"}
                {...others}
            >
                {children}
            </Stack>
        </GameViewContext.Provider>
    );
};

GameView.Content = GameViewContent;
GameView.Pagination = GameViewPagination;
GameView.LayoutSwitcher = GameViewLayoutSwitcher;

export default GameView;
