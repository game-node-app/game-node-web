import React, { useRef, useState } from "react";
import { CreateCommentDto, FindAllCommentsDto, Review } from "@/wrapper/server";
import { Divider, Space, Stack } from "@mantine/core";
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
    return (
        <Stack
            className={`w-full h-full hidden data-[enabled=true]:flex`}
            data-enabled={enabled ? "true" : "false"}
        >
            <CommentsListView
                enabled={enabled}
                sourceId={review.id}
                sourceType={sourceType.REVIEW}
            />
            <Space h={"0.5rem"} />
            <CommentEditorView
                sourceType={sourceType.REVIEW}
                sourceId={review.id}
            />
        </Stack>
    );
};

export default ReviewListItemComments;
