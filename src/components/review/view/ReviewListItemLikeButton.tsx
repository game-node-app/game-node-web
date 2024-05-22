import React from "react";
import { IconThumbUp } from "@tabler/icons-react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { FindOneStatisticsDto, Review } from "@/wrapper/server";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";
import useUserId from "@/components/auth/hooks/useUserId";
import { redirectToAuth } from "supertokens-auth-react";

interface IReviewListLikesProps {
    review: Review;
}

const ReviewListItemLikeButton = ({ review }: IReviewListLikesProps) => {
    const userId = useUserId();
    const [likesCount, isLiked, toggleUserLike] = useUserLike({
        sourceId: review.id,
        sourceType: FindOneStatisticsDto.sourceType.REVIEW,
        targetUserId: review.profileUserId,
    });

    return (
        <Group gap={"0.5rem"}>
            <ActionIcon
                onClick={async () => {
                    if (!userId) {
                        redirectToAuth();
                        return;
                    }
                    toggleUserLike();
                }}
                variant={isLiked ? "filled" : "subtle"}
                size={"xl"}
                color={isLiked ? "brand" : "white"}
                data-disabled={!userId}
            >
                <IconThumbUp />
                <Text>{likesCount}</Text>
            </ActionIcon>
        </Group>
    );
};

export default ReviewListItemLikeButton;
