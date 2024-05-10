import React, { PropsWithChildren } from "react";
import GameSelectViewContent from "@/components/general/view/select/GameSelectViewContent";
import GameViewPagination from "@/components/general/view/game/GameViewPagination";
import GameSelectActions from "@/components/general/view/select/GameSelectActions";

interface GameSelectViewProps extends PropsWithChildren {}

const GameSelectView = ({ children }: GameSelectViewProps) => {
    return <>{children}</>;
};

GameSelectView.Content = GameSelectViewContent;
GameSelectView.Pagination = GameViewPagination;
GameSelectView.Actions = GameSelectActions;

export default GameSelectView;
