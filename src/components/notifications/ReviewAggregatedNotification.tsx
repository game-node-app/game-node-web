import { useMemo } from "react";
import { AggregatedNotificationProps } from "@/components/notifications/AggregatedNotification";
import { useReview } from "@/components/review/hooks/useReview";
import { useGame } from "@/components/game/hooks/useGame";
import { NotificationAggregateDto } from "@/wrapper/server";
import category = NotificationAggregateDto.category;
import getUniqueProfileNames from "@/components/notifications/utils/getUniqueProfileNames";
import { Notification, Text } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import Link from "next/link";

const ReviewAggregatedNotification = ({
    aggregatedNotification,
}: AggregatedNotificationProps) => {
    const reviewQuery = useReview(aggregatedNotification.sourceId as string);
    const profileQuery = useUserProfile(reviewQuery.data?.profileUserId);
    const userAvatar = <UserAvatar avatar={profileQuery.data?.avatar} />;
    const render = useMemo(() => {
        switch (aggregatedNotification.category) {
            case category.LIKE:
                const profileNames = [
                    ...getUniqueProfileNames(
                        aggregatedNotification.notifications,
                    ),
                    "Prado",
                    "Matheus",
                ];
                const lastProfilesNames = profileNames.slice(0, 2).join(", ");
                const hasMoreProfileNames = profileNames.length > 2;
                return (
                    <Link
                        href={`/game/${reviewQuery.data?.gameId}`}
                        className={"w-full"}
                    >
                        <Notification
                            className={"w-full"}
                            withCloseButton={false}
                            icon={userAvatar}
                        >
                            <Text fz={"sm"}>
                                <strong>{lastProfilesNames}</strong>{" "}
                                {hasMoreProfileNames && (
                                    <>and {profileNames.length - 2} others</>
                                )}{" "}
                                liked your review!
                            </Text>
                        </Notification>
                    </Link>
                );
        }
        return null;
    }, [
        aggregatedNotification.category,
        aggregatedNotification.notifications,
        userAvatar,
    ]);
    return [render];
};

export default ReviewAggregatedNotification;
