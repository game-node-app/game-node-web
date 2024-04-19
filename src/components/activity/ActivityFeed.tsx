import React, { useMemo } from "react";
import { useInfiniteActivities } from "@/components/activity/hooks/useInfiniteActivities";
import { Stack } from "@mantine/core";
import { Activity } from "@/wrapper/server";
import type = Activity.type;
import ReviewActivityItem from "@/components/activity/item/ReviewActivityItem";
import CenteredLoading from "@/components/general/CenteredLoading";
import CollectionEntryActivityItem from "@/components/activity/item/CollectionEntryActivityItem";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import UserFollowActivityItem from "@/components/activity/item/UserFollowActivityItem";

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
                switch (activity.type) {
                    case type.REVIEW:
                        return (
                            <ReviewActivityItem
                                key={activity.id}
                                activity={activity}
                            />
                        );
                    case type.COLLECTION_ENTRY:
                        return (
                            <CollectionEntryActivityItem
                                key={activity.id}
                                activity={activity}
                            />
                        );
                    case type.FOLLOW:
                        return (
                            <UserFollowActivityItem
                                key={activity.id}
                                activity={activity}
                            />
                        );
                }
            });
        });
    }, [activityQuery.data]);

    const isLoading = activityQuery.isLoading;
    const isError = activityQuery.isError;
    const isSucess = activityQuery.isSuccess;
    const isEmpty =
        activityQuery.data != undefined &&
        activityQuery.data?.pages.some((page) => {
            return page.pagination.totalItems === 0;
        });

    return (
        <Stack className={"w-full h-full"}>
            {activityQuery.isLoading && <CenteredLoading />}
            {!isLoading && isEmpty && (
                <CenteredErrorMessage
                    message={"No activities to show. Try a different filter."}
                />
            )}
            {isError && (
                <CenteredErrorMessage
                    message={
                        "Error while fetching activities. Please try again or contact support."
                    }
                />
            )}
            {items}
        </Stack>
    );
};

export default ActivityFeed;
