import React, { useMemo } from "react";
import { NotificationAggregateDto } from "@/wrapper/server";
import ReviewAggregatedNotification from "@/components/notifications/ReviewAggregatedNotification";
import sourceType = NotificationAggregateDto.sourceType;

export interface AggregatedNotificationProps {
    aggregatedNotification: NotificationAggregateDto;
}

const AggregatedNotification = ({
    aggregatedNotification,
}: AggregatedNotificationProps) => {
    const content = useMemo(() => {
        switch (aggregatedNotification.sourceType) {
            case sourceType.REVIEW:
                return (
                    <ReviewAggregatedNotification
                        aggregatedNotification={aggregatedNotification}
                    />
                );
        }

        return null;
    }, [aggregatedNotification]);
    return content;
};

export default AggregatedNotification;
