import React, { useMemo } from "react";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { useLatestActivities } from "@/components/activity/hooks/useLatestActivities";
import ReviewActivityItem from "@/components/activity/item/ReviewActivityItem";
import CollectionEntryActivityItem from "@/components/activity/item/CollectionEntryActivityItem";
import UserFollowActivityItem from "@/components/activity/item/UserFollowActivityItem";
import { Stack } from "@mantine/core";
import CenteredLoading from "@/components/general/CenteredLoading";
import { Activity } from "@/wrapper/server";
import type = Activity.type;

interface Props {
    userId?: string;
    limit?: number;
    offset?: number;
}

const RecentActivitiesList = ({ userId, offset = 0, limit = 5 }: Props) => {
    const activitiesQuery = useLatestActivities(userId, offset, limit);

    const items = useMemo(() => {
        if (!activitiesQuery.data) return null;
        return activitiesQuery.data.data.map((activity) => {
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
    }, [activitiesQuery.data]);

    return (
        <Stack className={"w-full h-full"}>
            {activitiesQuery.isLoading && <CenteredLoading />}
            {items}
        </Stack>
    );
};

export default RecentActivitiesList;
