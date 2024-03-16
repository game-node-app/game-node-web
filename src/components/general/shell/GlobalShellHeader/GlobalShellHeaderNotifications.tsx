import React, { useCallback, useEffect, useMemo } from "react";
import {
    ActionIcon,
    Box,
    Button,
    Center,
    Popover,
    ScrollArea,
    Skeleton,
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

    const { data, isLoading, isError, invalidate, isFetching, fetchNextPage } =
        useInfiniteAggregatedNotifications();

    /**
     * Notifications should be marked as viewed on hover for desktop, and when the popover is opened
     * for mobile.
     */
    const notificationViewMutation = useMutation({
        mutationFn: async (notifications: Notification[]) => {
            if (notifications == undefined || notifications.length === 0)
                return false;

            const hasUnreadNotifications = notifications.some(
                (notification) => !notification.isViewed,
            );
            if (!hasUnreadNotifications) {
                return false;
            }

            for (const notification of notifications) {
                await NotificationsService.notificationsControllerUpdateViewedStatus(
                    notification.id,
                    {
                        isViewed: true,
                    },
                );
            }

            return true;
        },
        onSuccess: (shouldInvalidate) => {
            if (shouldInvalidate) {
                invalidate();
            }
        },
    });

    const aggregations = useMemo(() => {
        return data?.pages.flatMap((response) =>
            response.data.map((aggregation) => aggregation),
        );
    }, [data?.pages]);

    const lastElement = data?.pages[data?.pages.length - 1];
    const hasNextPage =
        lastElement != undefined && lastElement.pagination.hasNextPage;

    const buildNotificationsSkeletons = useCallback(() => {
        return new Array(5).fill(0).map((v, i) => {
            return <Skeleton key={i} className={"w-full h-20"} />;
        });
    }, []);

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
                        {isFetching && buildNotificationsSkeletons()}
                        {isEmpty && <Text>No notifications.</Text>}
                        {hasNextPage && (
                            <Center>
                                <Button
                                    size={"md"}
                                    onClick={() => {
                                        fetchNextPage();
                                    }}
                                >
                                    Show more
                                </Button>
                            </Center>
                        )}
                    </Stack>
                </ScrollArea.Autosize>
            </Popover.Dropdown>
        </Popover>
    );
};

export default GlobalShellHeaderNotifications;
