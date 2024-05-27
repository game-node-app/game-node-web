import React, { useRef, useState } from "react";
import { CreateCommentDto, FindAllCommentsDto, Review } from "@/wrapper/server";
import { Space, Stack } from "@mantine/core";
import CommentsListView from "@/components/comment/view/CommentsListView";
import CommentEditorView from "@/components/comment/editor/CommentEditorView";
import sourceType = FindAllCommentsDto.sourceType;
import ItemDropdown from "@/components/general/input/dropdown/ItemDropdown";

interface ReviewListItemCommentsProps {
    enabled: boolean;
    review: Review;
}

const ReviewListItemComments = ({
    review,
    enabled,
}: ReviewListItemCommentsProps) => {
    const [editedCommentId, setEditedCommentId] = useState<string | undefined>(
        undefined,
    );

    const editorContainerRef = useRef<HTMLDivElement>(null);

    return (
        <Stack
            className={`w-full h-full hidden data-[enabled=true]:flex`}
            data-enabled={enabled ? "true" : "false"}
        >
            <CommentsListView
                enabled={enabled}
                sourceId={review.id}
                sourceType={sourceType.REVIEW}
                editedCommentId={editedCommentId}
                onEditStart={(commentId) => {
                    setEditedCommentId(commentId);
                    if (editorContainerRef.current) {
                        editorContainerRef.current.scrollIntoView({
                            behavior: "smooth",
                            inline: "nearest",
                            block: "center",
                        });
                    }
                }}
            />
            <Space h={"0.5rem"} />
            <CommentEditorView
                commentId={editedCommentId}
                sourceType={sourceType.REVIEW}
                sourceId={review.id}
                onCancel={() => {
                    setEditedCommentId(undefined);
                }}
                editorContainerRef={editorContainerRef}
            />
        </Stack>
    );
};

export default ReviewListItemComments;
