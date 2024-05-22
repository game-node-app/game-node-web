import React, { useState } from "react";
import { BubbleMenu, EditorOptions, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { RichTextEditor } from "@mantine/tiptap";

interface Props extends Partial<EditorOptions> {}

const CommentEditor = ({ ...editorOptions }: Props) => {
    const editor = useEditor({
        ...editorOptions,
        extensions: [StarterKit],
    });

    return (
        <RichTextEditor editor={editor} className={"w-full h-full"}>
            {editor && (
                <BubbleMenu editor={editor}>
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Link />
                    </RichTextEditor.ControlsGroup>
                </BubbleMenu>
            )}
            <RichTextEditor.Content />
        </RichTextEditor>
    );
};

export default CommentEditor;
