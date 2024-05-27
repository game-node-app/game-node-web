import React, { useState } from "react";
import { BubbleMenu, EditorOptions, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";

interface Props extends Partial<EditorOptions> {}

export const COMMENT_EDITOR_EXTENSIONS = [StarterKit];

const CommentEditor = ({ ...editorOptions }: Props) => {
    const editor = useEditor(
        {
            ...editorOptions,
            extensions: COMMENT_EDITOR_EXTENSIONS,
        },
        [editorOptions.content],
    );

    return (
        <RichTextEditor editor={editor} className={"w-full h-full"}>
            {editor && (
                <BubbleMenu editor={editor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                    </RichTextEditor.ControlsGroup>
                </BubbleMenu>
            )}
            <RichTextEditor.Content />
        </RichTextEditor>
    );
};

export default CommentEditor;
