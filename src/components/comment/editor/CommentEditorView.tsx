import React, { useState } from "react";
import { Stack } from "@mantine/core";
import CommentEditor from "@/components/comment/editor/CommentEditor";

interface Props {
    /**
     * If available, user will be able to modify this comment.
     */
    commentId?: string;
}

const CommentEditorView = ({ commentId }: Props) => {
    const [content, setContent] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Stack className={"w-full h-full"}>
            <CommentEditor
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </Stack>
    );
};

export default CommentEditorView;
