import React from "react";
import useUserId from "@/components/auth/hooks/useUserId";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";
import { StatisticsActionDto } from "@/wrapper/server";
import sourceType = StatisticsActionDto.sourceType;
import { ActionIcon, Group, Text } from "@mantine/core";
import { redirectToAuth } from "supertokens-auth-react";
import { IconThumbUp } from "@tabler/icons-react";
import useOnMobile from "@/components/general/hooks/useOnMobile";

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
        <ActionIcon
            onClick={async () => {
                if (!userId) {
                    await redirectToAuth();
                    return;
                }
                toggleLike();
            }}
            variant={isLiked ? "filled" : "default"}
            size={"lg"}
            color={isLiked ? "brand" : "white"}
            data-disabled={!userId}
        >
            <IconThumbUp />
            <Text>{likesCount}</Text>
        </ActionIcon>
    );
};

export default ActivityItemLikes;
