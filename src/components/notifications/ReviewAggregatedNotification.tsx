import { useMemo } from "react";
import {
    AggregatedNotificationContentProps,
    AggregatedNotificationProps,
} from "@/components/notifications/AggregatedNotification";
import { useReview } from "@/components/review/hooks/useReview";
import { NotificationAggregateDto } from "@/wrapper/server";
import getUniqueProfileNames from "@/components/notifications/utils/getUniqueProfileNames";
import { Group, Notification, Text } from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import Link from "next/link";
import category = NotificationAggregateDto.category;
import { useGame } from "@/components/game/hooks/useGame";

const ReviewAggregatedNotification = ({
    aggregatedNotification,
}: AggregatedNotificationContentProps) => {
    const reviewQuery = useReview(aggregatedNotification.sourceId as string);
    const gameQuery = useGame(reviewQuery.data?.gameId, {});

    const render = useMemo(() => {
        if (aggregatedNotification.notifications.length === 0) {
            return null;
        }
        const profileNames = getUniqueProfileNames(
            aggregatedNotification.notifications,
        );
        const latestNotification = aggregatedNotification.notifications[0];
        const latestNotificationUserId = latestNotification.profileUserId;
        const latestProfileNames = profileNames.slice(0, 2).join(", ");
        const hasMoreProfileNames = profileNames.length > 2;
        const gameName = gameQuery.data?.name;

        switch (aggregatedNotification.category) {
            case category.LIKE:
                return (
                    <Link
                        href={`/game/${reviewQuery.data?.gameId}`}
                        className={"w-full"}
                    >
                        <Group wrap={"nowrap"} className={"w-full"}>
                            {latestNotificationUserId && (
                                <UserAvatar userId={latestNotificationUserId} />
                            )}
                            <Text lineClamp={4}>
                                <strong>{latestProfileNames}</strong>{" "}
                                {hasMoreProfileNames && (
                                    <>and {profileNames.length - 2} others</>
                                )}{" "}
                                liked your review
                                {gameName && (
                                    <>
                                        {" "}
                                        of <strong>{gameName}</strong>
                                    </>
                                )}
                                !
                            </Text>
                        </Group>
                    </Link>
                );
            case category.COMMENT:
                return (
                    <Link
                        href={`/game/${reviewQuery.data?.gameId}`}
                        className={"w-full"}
                    >
                        <Group wrap={"nowrap"} className={"w-full"}>
                            {latestNotificationUserId && (
                                <UserAvatar userId={latestNotificationUserId} />
                            )}
                            <Text lineClamp={4}>
                                <strong>{latestProfileNames}</strong>{" "}
                                {hasMoreProfileNames && (
                                    <>and {profileNames.length - 2} others</>
                                )}{" "}
                                commented on your review
                                {gameName && (
                                    <>
                                        {" "}
                                        of <strong>{gameName}</strong>
                                    </>
                                )}
                                !
                            </Text>
                        </Group>
                    </Link>
                );
        }
        return null;
    }, [
        aggregatedNotification.category,
        aggregatedNotification.notifications,
        gameQuery.data,
        reviewQuery.data?.gameId,
    ]);

    return [render];
};

export default ReviewAggregatedNotification;
