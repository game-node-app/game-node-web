import React from "react";
import { UseCommentsProps } from "@/components/comment/hooks/useComments";
import { Review } from "@/wrapper/server";
import { Stack } from "@mantine/core";
import CommentsListView from "@/components/comment/view/CommentsListView";
import CommentEditor from "@/components/comment/editor/CommentEditor";

interface ReviewListItemCommentsProps {
    enabled: boolean;
    review: Review;
}

const ReviewListItemComments = ({
    review,
    enabled,
}: ReviewListItemCommentsProps) => {
    return (
        <Stack className={"w-full h-full"}>
            <CommentsListView
                enabled={true}
                sourceId={review.id}
                sourceType={"review"}
            />
            <CommentEditor />
        </Stack>
    );
};

export default ReviewListItemComments;
