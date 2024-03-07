import React, { useMemo } from "react";
import { AggregatedNotificationProps } from "@/components/notifications/AggregatedNotification";
import { Notification, Text } from "@mantine/core";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import Link from "next/link";
import useUserId from "@/components/auth/hooks/useUserId";

const FollowerAggregatedNotification = ({
    aggregatedNotification,
}: AggregatedNotificationProps) => {
    const ownUserId = useUserId();
    const content = useMemo(() => {
        if (
            !aggregatedNotification ||
            aggregatedNotification.notifications.length === 0
        ) {
            return null;
        }
        const followerProfile = aggregatedNotification.notifications[0].profile;
        const followerUserId =
            aggregatedNotification.notifications[0].profileUserId;
        return (
            <Link href={`/profile/${ownUserId}`} className={"w-full"}>
                <Notification
                    className={"w-full"}
                    withCloseButton={false}
                    icon={
                        followerUserId && <UserAvatar userId={followerUserId} />
                    }
                >
                    <Text>
                        <strong>{followerProfile?.username}</strong> has started
                        following you!
                    </Text>
                </Notification>
            </Link>
        );
    }, [aggregatedNotification]);

    return content;
};

export default FollowerAggregatedNotification;
