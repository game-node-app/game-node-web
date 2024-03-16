import React, { useMemo } from "react";
import { NotificationAggregateDto } from "@/wrapper/server";
import ReviewAggregatedNotification from "@/components/notifications/ReviewAggregatedNotification";
import FollowerAggregatedNotification from "@/components/notifications/FollowerAggregatedNotification";
import sourceType = NotificationAggregateDto.sourceType;
import category = NotificationAggregateDto.category;
import { Box, Notification } from "@mantine/core";

export interface AggregatedNotificationProps {
    aggregatedNotification: NotificationAggregateDto;
    onClick: () => void;
    backgroundColor: "normal" | "darker";
}

export interface AggregatedNotificationContentProps {
    aggregatedNotification: NotificationAggregateDto;
}

const AggregatedNotification = ({
    aggregatedNotification,
    onClick,
    backgroundColor,
}: AggregatedNotificationProps) => {
    const notificationContent = useMemo(() => {
        switch (aggregatedNotification.sourceType) {
            case sourceType.REVIEW:
                return (
                    <ReviewAggregatedNotification
                        aggregatedNotification={aggregatedNotification}
                    />
                );
            case sourceType.PROFILE:
                if (aggregatedNotification.category === category.FOLLOW)
                    return (
                        <FollowerAggregatedNotification
                            aggregatedNotification={aggregatedNotification}
                        />
                    );
                return null;
        }

        return null;
    }, [aggregatedNotification]);

    return (
        <Notification
            color="rgba(255, 255, 255, 0)"
            className={`w-full ${backgroundColor === "normal" ? "bg-[#262626]" : "bg-[#171717]"}`}
            withCloseButton={false}
            onClick={onClick}
            radius={0}
            styles={{
                root: {
                    paddingLeft: 10,
                    paddingRight: 10,
                },
            }}
        >
            {notificationContent}
        </Notification>
    );
};

export default AggregatedNotification;
