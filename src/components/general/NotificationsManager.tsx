import React, { useEffect, useState } from "react";
import { Notifications } from "@mantine/notifications";
import { Notification } from "@/wrapper/server";
import useUserId from "@/components/auth/hooks/useUserId";
import ReconnectingEventSource from "reconnecting-eventsource";
import { notifications } from "@mantine/notifications";
import { Text } from "@mantine/core";
const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
const targetSSEUrl = baseUrl + "/v1/notifications/stream";

const handleNotifications = async (notificationsEntities: Notification[]) => {
    for (const notification of notificationsEntities) {
        if (notification.category === "like") {
            if (notification.sourceType === "review") {
                notifications.show({
                    message: (
                        <Text fz={"sm"}>
                            <strong>{notification.profile?.username}</strong>{" "}
                            has liked your review!{" "}
                        </Text>
                    ),
                    autoClose: 4000,
                });
            }
        }
    }
};

const NotificationsManager = () => {
    const userId = useUserId();
    useEffect(() => {
        if (!userId) return;
        const eventSource = new ReconnectingEventSource(targetSSEUrl, {
            withCredentials: true,
            max_retry_time: 5000,
        });
        eventSource.onopen = (conn) => {
            console.log("Connected to notifications SSE: ", conn);
        };
        eventSource.onmessage = (message) => {
            const notifications: Notification[] = JSON.parse(message.data);
            console.log(notifications);
            handleNotifications(notifications).then().catch(console.error);
        };

        return () => {
            eventSource.close();
        };
    }, [userId]);

    return <Notifications />;
};

export default NotificationsManager;
