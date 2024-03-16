import React, { useEffect, useMemo, useState } from "react";
import { NotificationAggregateDto } from "@/wrapper/server";
import ReviewAggregatedNotification from "@/components/notifications/ReviewAggregatedNotification";
import FollowerAggregatedNotification from "@/components/notifications/FollowerAggregatedNotification";
import sourceType = NotificationAggregateDto.sourceType;
import category = NotificationAggregateDto.category;

export interface AggregatedNotificationProps {
    aggregatedNotification: NotificationAggregateDto;
}

const AggregatedNotification = ({
    aggregatedNotification,
}: AggregatedNotificationProps) => {
    const notification = useMemo(() => {
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
    return notification;
};

export default AggregatedNotification;
