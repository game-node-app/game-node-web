import React from "react";
import { IconThumbUp } from "@tabler/icons-react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { Review } from "@/wrapper/server";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";

interface IReviewListLikesProps {
    review: Review;
    isOwnReview: boolean;
}

const ReviewListItemLikes = ({
    review,
    isOwnReview,
}: IReviewListLikesProps) => {
    const [likesCount, isLiked, toggleUserLike] = useUserLike({
        sourceId: review.id,
        sourceType: "review",
    });

    return (
        <Group gap={"0.5rem"}>
            <ActionIcon
                onClick={() => {
                    console.log("OnClick - UserLike");
                    toggleUserLike();
                }}
                variant={isLiked ? "filled" : "subtle"}
                size={"xl"}
                color={"brand"}
                disabled={isOwnReview}
            >
                <IconThumbUp />
                <Text>{likesCount}</Text>
            </ActionIcon>
        </Group>
    );
};

export default ReviewListItemLikes;
