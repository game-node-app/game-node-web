import React from "react";
import { CreateCommentDto, FindAllCommentsDto, Review } from "@/wrapper/server";
import { Space, Stack } from "@mantine/core";
import CommentsListView from "@/components/comment/view/CommentsListView";
import CommentEditorView from "@/components/comment/editor/CommentEditorView";
import sourceType = FindAllCommentsDto.sourceType;

interface ReviewListItemCommentsProps {
    enabled: boolean;
    review: Review;
}

const ReviewListItemComments = ({
    review,
    enabled,
}: ReviewListItemCommentsProps) => {
    return (
        enabled && (
            <Stack className={"w-full h-full"}>
                <CommentsListView
                    enabled={enabled}
                    sourceId={review.id}
                    sourceType={sourceType.REVIEW}
                    orderBy={{
                        createdAt: "DESC",
                    }}
                />
                <Space h={"0.5rem"} />
                <CommentEditorView
                    sourceType={sourceType.REVIEW}
                    sourceId={review.id}
                />
            </Stack>
        )
    );
};

export default ReviewListItemComments;
