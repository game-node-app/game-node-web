import React, { useMemo } from "react";

// Tiptap styles
import "@mantine/tiptap/styles.css";
import { Group, Paper, Stack, Title } from "@mantine/core";
import GameInfoReviewEditor from "@/components/game/info/review/editor/GameInfoReviewEditor";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import Break from "@/components/general/Break";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoReviewEditorView from "@/components/game/info/review/editor/GameInfoReviewEditorView";
import ReviewListView from "@/components/review/view/ReviewListView";
import useUserId from "@/components/auth/hooks/useUserId";
import { useCollectionEntriesForGameId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForGameId";

interface IGameInfoReviewViewProps {
    gameId: number;
}

const GameInfoReviewView = ({ gameId }: IGameInfoReviewViewProps) => {
    const userId = useUserId();
    const collectionEntries = useCollectionEntriesForGameId(gameId);
    const shouldRenderEditor =
        userId != undefined &&
        collectionEntries.data != undefined &&
        collectionEntries.data.length > 0;

    if (!gameId) return null;
    return (
        <Paper w={"100%"} h={"100%"} className={"min-h-[300px]"}>
            <Stack w={"100%"} h={"100%"} align={"center"}>
                {shouldRenderEditor && (
                    <DetailsBox
                        title={"Your review"}
                        content={<GameInfoReviewEditorView gameId={gameId} />}
                    />
                )}
                <DetailsBox
                    title={"All reviews"}
                    description={"Reader discretion is advised."}
                    content={<ReviewListView gameId={gameId} />}
                />
            </Stack>
        </Paper>
    );
};

export default GameInfoReviewView;
