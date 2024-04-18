import React, { useMemo } from "react";
import { useInfiniteActivities } from "@/components/activity/hooks/useInfiniteActivities";
import { Stack } from "@mantine/core";
import { Activity } from "@/wrapper/server";
import type = Activity.type;
import ReviewActivityItem from "@/components/activity/ReviewActivityItem";

interface Props {
    criteria: "following" | "all";
}

const ActivityFeed = ({ criteria }: Props) => {
    const activityQuery = useInfiniteActivities({
        criteria,
        limit: 10,
    });
    const items = useMemo(() => {
        if (!activityQuery.data) return undefined;
        return activityQuery.data.pages.flatMap((page) => {
            return page.data.map((activity) => {
                if (activity.type === type.REVIEW) {
                    return (
                        <ReviewActivityItem
                            key={activity.id}
                            activity={activity}
                        />
                    );
                }
            });
        });
    }, [activityQuery.data]);
    return <Stack className={"w-full h-full"}>{items}</Stack>;
};

export default ActivityFeed;
