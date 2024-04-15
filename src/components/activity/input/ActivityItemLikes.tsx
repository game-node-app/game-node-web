import React from "react";
import useUserId from "@/components/auth/hooks/useUserId";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";
import { StatisticsActionDto } from "@/wrapper/server";
import sourceType = StatisticsActionDto.sourceType;
import { ActionIcon, Group, Text } from "@mantine/core";
import { redirectToAuth } from "supertokens-auth-react";
import { IconThumbUp } from "@tabler/icons-react";

interface Props {
    activityId: string;
}

const ActivityItemLikes = ({ activityId }: Props) => {
    const userId = useUserId();
    const [likesCount, isLiked, toggleLike] = useUserLike({
        sourceId: activityId,
        targetUserId: userId,
        sourceType: sourceType.ACTIVITY,
    });
    return (
        <Group gap={"0.5rem"}>
            <ActionIcon
                onClick={async () => {
                    if (!userId) {
                        redirectToAuth();
                        return;
                    }
                    toggleLike();
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

export default ActivityItemLikes;
