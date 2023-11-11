import React from "react";

// Tiptap styles
import "@mantine/tiptap/styles.css";
import { Group, Paper, Stack, Title } from "@mantine/core";
import GameInfoReviewEditor from "@/components/game/info/review/editor/GameInfoReviewEditor";
import { UserAvatar } from "@/components/general/UserAvatar";
import Break from "@/components/general/Break";
import { GameInfoDetailsBox } from "@/components/game/info/GameInfoDetailsBox";
import GameInfoReviewEditorView from "@/components/game/info/review/editor/GameInfoReviewEditorView";

interface IGameInfoReviewViewProps {
    gameId: number;
}

const GameInfoReviewView = ({ gameId }: IGameInfoReviewViewProps) => {
    if (!gameId) return null;
    return (
        <Paper w={"100%"} h={"100%"} className={"min-h-[300px]"}>
            <Stack w={"100%"} h={"100%"} align={"center"}>
                <GameInfoDetailsBox
                    title={"Your review"}
                    content={<GameInfoReviewEditorView gameId={gameId} />}
                />

                <GameInfoDetailsBox
                    title={"Reviews from other users"}
                    description={"Reader discretion is advised."}
                    content={<div></div>}
                />
            </Stack>
        </Paper>
    );
};

export default GameInfoReviewView;
