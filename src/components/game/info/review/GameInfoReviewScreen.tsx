import React from "react";

import { Paper, Stack } from "@mantine/core";
import GameInfoReviewEditorView from "@/components/game/info/review/editor/GameInfoReviewEditorView";
import GameInfoReviewList from "@/components/game/info/review/GameInfoReviewList";

interface IGameInfoReviewViewProps {
    gameId: number;
    reviewId?: string;
}

const GameInfoReviewScreen = ({ gameId, reviewId }: IGameInfoReviewViewProps) => {
    if (!gameId) return null;
    return (
        <Paper w={"100%"} h={"100%"}>
            <Stack w={"100%"} h={"100%"} align={"center"}>
                <GameInfoReviewEditorView gameId={gameId} />
                <GameInfoReviewList gameId={gameId} reviewId={reviewId} />
            </Stack>
        </Paper>
    );
};

export default GameInfoReviewScreen;
