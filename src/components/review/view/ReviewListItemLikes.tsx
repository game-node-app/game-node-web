import React from "react";
import { IconThumbDown, IconThumbUp } from "@tabler/icons-react";
import { ActionIcon, ActionIconGroup, Group, Text } from "@mantine/core";
import { Review } from "@/wrapper/server";

interface IReviewListLikesProps {
    review: Review;
    isOwnReview: boolean;
}

const ReviewListItemLikes = ({
    review,
    isOwnReview,
}: IReviewListLikesProps) => {
    return (
        <Group gap={"0.5rem"}>
            <ActionIcon
                variant={"subtle"}
                disabled={isOwnReview}
                size={"lg"}
                c={"light"}
            >
                <IconThumbUp />
                <Text>3</Text>
            </ActionIcon>
        </Group>
    );
};

export default ReviewListItemLikes;
