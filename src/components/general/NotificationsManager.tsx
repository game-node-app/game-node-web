import React, { useEffect } from "react";
import {
    Notifications,
    notifications as notificationsManager,
} from "@mantine/notifications";
import { Notification } from "@/wrapper/server";
import useUserId from "@/components/auth/hooks/useUserId";
import ReconnectingEventSource from "reconnecting-eventsource";
import { Text } from "@mantine/core";

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const targetSSEUrl = baseUrl + "/v1/notifications/stream";
import category = Notification.category;
import sourceType = Notification.sourceType;
import { useInfiniteAggregatedNotifications } from "@/components/notifications/hooks/useInfiniteAggregatedNotifications";

const handleNotifications = async (notificationsEntities: Notification[]) => {
    for (const notification of notificationsEntities) {
        switch (notification.category) {
            case category.FOLLOW:
                if (notification.sourceType === sourceType.PROFILE) {
                    notificationsManager.show({
                        message: (
                            <Text>
                                <strong>
                                    {notification.profile?.username}
                                </strong>{" "}
                                has started following you!
                            </Text>
                        ),
                        autoClose: 7000,
                    });
                }
                break;
            case category.COMMENT:
                break;
            case category.LIKE:
                if (notification.sourceType === sourceType.REVIEW) {
                    notificationsManager.show({
                        message: (
                            <Text>
                                <strong>
                                    {notification.profile?.username}
                                </strong>{" "}
                                has liked your review!
                            </Text>
                        ),
                        autoClose: 7000,
                    });
                }
                break;
            case category.LAUNCH:
                break;
        }
    }
};

const NotificationsManager = () => {
    const userId = useUserId();
    const infiniteNotificationsQuery = useInfiniteAggregatedNotifications();
    useEffect(() => {
        let eventSource: ReconnectingEventSource;
        if (userId) {
            const eventSource = new ReconnectingEventSource(targetSSEUrl, {
                withCredentials: true,
                max_retry_time: 5000,
            });
            eventSource.onopen = (conn) => {
                console.log("Connected to notifications SSE: ", conn);
            };
            eventSource.onmessage = (message) => {
                const notifications: Notification[] = JSON.parse(message.data);
                handleNotifications(notifications)
                    .then(() => {
                        // Prevents unnecessary calls to notifications endpoint
                        if (notifications.length > 0) {
                            infiniteNotificationsQuery.invalidate();
                        }
                    })
                    .catch(console.error);
            };
        }

        return () => {
            if (eventSource) {
                eventSource.close();
            }
        };
    }, [infiniteNotificationsQuery, userId]);

    return <Notifications />;
};

export default NotificationsManager;
