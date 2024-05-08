import React, { PropsWithChildren } from "react";
import GameSelectViewContent from "@/components/general/view/select/GameSelectViewContent";
import GameViewPagination from "@/components/general/view/game/GameViewPagination";

interface GameSelectViewProps extends PropsWithChildren {}

const GameSelectView = ({ children }: GameSelectViewProps) => {
    return <>{children}</>;
};

GameSelectView.Content = GameSelectViewContent;
GameSelectView.Pagination = GameViewPagination;

export default GameSelectView;
