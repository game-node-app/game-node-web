import React, { useRef, useState } from "react";
import { CreateCommentDto, FindAllCommentsDto, Review } from "@/wrapper/server";
import { Divider, Modal, Space, Stack } from "@mantine/core";
import CommentsListView from "@/components/comment/view/CommentsListView";
import CommentEditorView from "@/components/comment/editor/CommentEditorView";
import sourceType = FindAllCommentsDto.sourceType;
import { BaseModalProps } from "@/util/types/modal-props";
import useOnMobile from "@/components/general/hooks/useOnMobile";

interface ReviewListItemCommentsProps extends BaseModalProps {
    review: Review;
}

const ReviewListItemComments = ({
    review,
    opened,
    onClose,
}: ReviewListItemCommentsProps) => {
    const onMobile = useOnMobile();

    return (
        <Modal
            title={"Comments in this review"}
            opened={opened}
            onClose={onClose}
            size={"xl"}
            fullScreen={onMobile}
        >
            <Stack className={`w-full h-full`}>
                <CommentsListView
                    enabled={opened}
                    sourceId={review.id}
                    sourceType={sourceType.REVIEW}
                />
                <CommentEditorView
                    sourceType={sourceType.REVIEW}
                    sourceId={review.id}
                />
            </Stack>
        </Modal>
    );
};

export default ReviewListItemComments;
