import React from "react";

// Tiptap styles
import "@mantine/tiptap/styles.css";
import { Paper, Stack } from "@mantine/core";
import GameInfoReviewEditorView from "@/components/game/info/review/editor/GameInfoReviewEditorView";
import ReviewListView from "@/components/review/view/ReviewListView";

interface IGameInfoReviewViewProps {
    gameId: number;
}

const GameInfoReviewView = ({ gameId }: IGameInfoReviewViewProps) => {
    if (!gameId) return null;
    return (
        <Paper w={"100%"} h={"100%"} className={""} suppressHydrationWarning>
            <Stack w={"100%"} h={"100%"} align={"center"}>
                <GameInfoReviewEditorView gameId={gameId} />
                <ReviewListView gameId={gameId} />
            </Stack>
        </Paper>
    );
};

export default GameInfoReviewView;
