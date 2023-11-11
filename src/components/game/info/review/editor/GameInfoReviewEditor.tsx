import React from "react";
import { Box, Container, Highlight, Text } from "@mantine/core";
import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";
import { useCollectionEntriesForGameId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForGameId";

const GameInfoReviewEditor = ({ gameId }: { gameId: number }) => {
    const editor = useEditor(
        {
            extensions: [StarterKit],
            content: `<i>Write your review...</i>`,
        },
        [],
    );

    return (
        <Box p={0} mx={0} w={"100%"}>
            <RichTextEditor editor={editor} w={"100%"} mx={0} mih={"25vh"}>
                <RichTextEditor.Toolbar w={"100%"}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Strikethrough />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>
                <RichTextEditor.Content w={"100%"} />
            </RichTextEditor>
        </Box>
    );
};

export default GameInfoReviewEditor;
