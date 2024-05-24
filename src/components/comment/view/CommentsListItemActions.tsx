import React, { useMemo } from "react";
import { CommentStatistics, FindOneStatisticsDto } from "@/wrapper/server";
import { useItemStatistics } from "@/components/statistics/hooks/useItemStatistics";
import { UserComment } from "@/components/comment/types";
import sourceType = FindOneStatisticsDto.sourceType;
import { ActionIcon, Group, Text } from "@mantine/core";
import { redirectToAuth } from "supertokens-auth-react";
import { IconThumbUp } from "@tabler/icons-react";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";
import useUserId from "@/components/auth/hooks/useUserId";

interface Props {
    comment: UserComment;
}

const CommentsListItemActions = ({ comment }: Props) => {
    const ownUserId = useUserId();
    const statisticsType = useMemo(() => {
        if (comment.reviewId != undefined) {
            return sourceType.REVIEW_COMMENT;
        }

        return sourceType.REVIEW_COMMENT;
    }, [comment]);
    const statisticsQuery = useItemStatistics<CommentStatistics>(
        comment.id,
        statisticsType!,
    );
    const [likesCount, isLiked, toggleUserLike] = useUserLike({
        sourceId: comment.id,
        sourceType: statisticsType,
        targetUserId: comment.profileUserId,
    });
    return (
        <Group className={"w-full justify-end"}>
            <ActionIcon
                onClick={async () => {
                    if (!ownUserId) {
                        redirectToAuth();
                        return;
                    }
                    toggleUserLike();
                }}
                variant={isLiked ? "filled" : "subtle"}
                size={"xl"}
                color={isLiked ? "brand" : "white"}
                data-disabled={!ownUserId}
            >
                <IconThumbUp />
                <Text>{likesCount}</Text>
            </ActionIcon>
        </Group>
    );
};

export default CommentsListItemActions;
