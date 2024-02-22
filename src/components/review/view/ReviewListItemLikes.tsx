import React from "react";
import { IconThumbUp } from "@tabler/icons-react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { Review } from "@/wrapper/server";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";

interface IReviewListLikesProps {
    review: Review;
}

const ReviewListItemLikes = ({ review }: IReviewListLikesProps) => {
    const [likesCount, isLiked, toggleUserLike] = useUserLike({
        sourceId: review.id,
        sourceType: "review",
    });

    return (
        <Group gap={"0.5rem"}>
            <ActionIcon
                onClick={() => {
                    toggleUserLike();
                }}
                variant={isLiked ? "filled" : "subtle"}
                size={"xl"}
                color={isLiked ? "brand" : "white"}
            >
                <IconThumbUp />
                <Text>{likesCount}</Text>
            </ActionIcon>
        </Group>
    );
};

export default ReviewListItemLikes;
