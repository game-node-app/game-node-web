import React, { useEffect, useMemo } from "react";
import {
    ActionIcon,
    Box,
    Popover,
    ScrollArea,
    Stack,
    Text,
} from "@mantine/core";
import { IconBell, IconBellFilled } from "@tabler/icons-react";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import AggregatedNotification from "@/components/notifications/AggregatedNotification";
import { useDisclosure, useIntersection } from "@mantine/hooks";
import { useMutation } from "@tanstack/react-query";
import { Notification, NotificationsService } from "@/wrapper/server";
import { useInfiniteAggregatedNotifications } from "@/components/notifications/hooks/useInfiniteAggregatedNotifications";

const GlobalShellHeaderNotifications = () => {
    const [isPopoverOpened, popoverUtils] = useDisclosure();
    const onMobile = useOnMobile();

    const intersection = useIntersection({
        threshold: 0.5,
    });

    const { data, isLoading, isError, invalidate, isFetching, fetchNextPage } =
        useInfiniteAggregatedNotifications();

    /**
     * Notifications should be marked as viewed on hover for desktop, and when the popover is opened
     * for mobile.
     */
    const notificationViewMutation = useMutation({
        mutationFn: async (notifications: Notification[]) => {
            if (notifications == undefined || notifications.length === 0)
                return;

            for (const notification of notifications) {
                await NotificationsService.notificationsControllerUpdateViewedStatus(
                    notification.id,
                    {
                        isViewed: true,
                    },
                );
            }
        },
        onSuccess: () => {
            invalidate();
        },
    });

    const aggregations = useMemo(() => {
        return data?.pages.flatMap((response) =>
            response.data.map((aggregation) => aggregation),
        );
    }, [data?.pages]);

    const isEmpty =
        !isLoading && (aggregations == undefined || aggregations.length === 0);

    const hasUnreadNotifications = useMemo((): boolean => {
        if (aggregations == undefined || aggregations.length === 0)
            return false;

        for (const aggregation of aggregations) {
            const unread = aggregation.notifications.some(
                (notification) => !notification.isViewed,
            );
            if (unread) return true;
        }
        return false;
    }, [aggregations]);

    useEffect(() => {
        const entry = intersection.entry;
        if (!entry || !entry.isIntersecting || isFetching) {
            return;
        }

        if (data && data.pages) {
            const lastElement = data.pages[data.pages.length - 1];
            if (lastElement && lastElement.pagination.hasNextPage) {
                fetchNextPage();
            }
        }
    }, [data, fetchNextPage, intersection.entry, isFetching]);

    /**
     * Effect to mark notifications as seen when popover is open
     */
    useEffect(() => {
        const hasAggregations =
            aggregations != undefined && aggregations.length > 0;
        if (hasAggregations && onMobile && isPopoverOpened) {
            const lastLoadedAggregation =
                aggregations[aggregations!.length - 1];
            notificationViewMutation.mutate(
                lastLoadedAggregation.notifications,
            );
        }
    }, [onMobile, isPopoverOpened, aggregations, notificationViewMutation]);

    return (
        <Popover
            width={onMobile ? 320 : 350}
            position={onMobile ? "bottom" : "left-start"}
            offset={13}
            withArrow
            shadow="md"
            opened={isPopoverOpened}
        >
            <Popover.Target>
                <ActionIcon
                    c={hasUnreadNotifications ? "brand" : "unset"}
                    variant={"transparent"}
                    onClick={popoverUtils.toggle}
                >
                    {hasUnreadNotifications ? <IconBellFilled /> : <IconBell />}
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown p={0}>
                <ScrollArea.Autosize mah={400}>
                    <Stack w={"100%"} h={"100%"} align={"center"} gap={4}>
                        {aggregations?.map((aggregatedNotification, index) => {
                            const key = `${aggregatedNotification.sourceType}-${aggregatedNotification.sourceId}-${aggregatedNotification.sourceType}`;
                            const hasUnreadAggregationNotifications =
                                aggregatedNotification.notifications.some(
                                    (notification) => !notification.isViewed,
                                );
                            return (
                                <Box
                                    key={key}
                                    className={"w-full h-full"}
                                    onClick={() => {
                                        popoverUtils.close();
                                    }}
                                    onMouseEnter={() => {
                                        if (
                                            notificationViewMutation.isPending ||
                                            isFetching ||
                                            !hasUnreadAggregationNotifications
                                        )
                                            return;
                                        notificationViewMutation.mutate(
                                            aggregatedNotification.notifications,
                                        );
                                    }}
                                >
                                    <AggregatedNotification
                                        aggregatedNotification={
                                            aggregatedNotification
                                        }
                                    />
                                </Box>
                            );
                        })}
                        {isEmpty && <Text>No notifications.</Text>}
                        <div
                            id="notifications-last-element-tracker"
                            ref={intersection.ref}
                        />
                    </Stack>
                </ScrollArea.Autosize>
            </Popover.Dropdown>
        </Popover>
    );
};

export default GlobalShellHeaderNotifications;
