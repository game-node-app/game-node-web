import React from "react";
import { ActionIcon, Popover, ScrollArea, Stack, Text } from "@mantine/core";
import { IconNotification } from "@tabler/icons-react";
import { useAggregatedNotifications } from "@/components/notifications/hooks/useAggregatedNotifications";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import AggregatedNotification from "@/components/notifications/AggregatedNotification";
import { useDisclosure } from "@mantine/hooks";

const GlobalShellHeaderNotifications = () => {
    const [isPopoverOpened, popoverUtils] = useDisclosure();
    const onMobile = useOnMobile();
    const { data, isLoading, isError } = useAggregatedNotifications(0);
    const isEmpty = !isLoading && (data == undefined || data.data.length === 0);
    return (
        <Popover
            width={onMobile ? 320 : 350}
            position={onMobile ? "bottom" : "left-start"}
            offset={13}
            withArrow
            shadow="md"
        >
            <Popover.Target>
                <ActionIcon c={"unset"} variant={"transparent"}>
                    <IconNotification />
                </ActionIcon>
            </Popover.Target>
            <Popover.Dropdown p={0}>
                <ScrollArea.Autosize>
                    <Stack w={"100%"} align={"center"} gap={4}>
                        {data?.data.map((aggregatedNotification, index) => {
                            const key = `${aggregatedNotification.sourceType}-${aggregatedNotification.sourceId}-${aggregatedNotification.sourceType}`;
                            return (
                                <AggregatedNotification
                                    aggregatedNotification={
                                        aggregatedNotification
                                    }
                                    key={key}
                                />
                            );
                        })}
                        {isEmpty && <Text>No notifications.</Text>}
                    </Stack>
                </ScrollArea.Autosize>
            </Popover.Dropdown>
        </Popover>
    );
};

export default GlobalShellHeaderNotifications;
