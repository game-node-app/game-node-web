import React from "react";
import ActivityFeedLayout from "@/components/activity/ActivityFeedLayout";
import { Container, Text } from "@mantine/core";
import { useInfiniteActivities } from "@/components/activity/hooks/useInfiniteActivities";
import ActivityFeed from "@/components/activity/ActivityFeed";

const All = () => {
    const activities = useInfiniteActivities({
        limit: 10,
        criteria: "all",
    });
    return (
        <Container fluid>
            <ActivityFeedLayout currentTab={"all"}>
                <ActivityFeed criteria={"all"} />
            </ActivityFeedLayout>
        </Container>
    );
};

export default All;
