import React, { useMemo, useState } from "react";
import {
    Box,
    Center,
    Divider,
    Group,
    Overlay,
    Paper,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import useCollectionEntriesForUserId from "@/components/collection/collection-entry/hooks/useCollectionEntriesForUserId";
import useReviewsForUserId from "@/components/review/hooks/useReviewsForUserId";
import Link from "next/link";
import UserLevelInfo from "@/components/user-level/UserLevelInfo";
import CenteredLoading from "@/components/general/CenteredLoading";
import { useAllObtainedAchievements } from "@/components/achievement/hooks/useAllObtainedAchievements";
import AchievementItem from "@/components/achievement/AchievementItem";
import ObtainedAchievementItem from "@/components/achievement/ObtainedAchievementItem";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import ProfileFollowActions from "@/components/profile/view/ProfileFollowActions";
import { useFollowersCount } from "@/components/follow/hooks/useFollowersCount";
import useUserId from "@/components/auth/hooks/useUserId";

const dateFormater = new Intl.DateTimeFormat();

interface Props {
    userId: string;
}
const ProfileUserInfo = ({ userId }: Props) => {
    const ownUserId = useUserId();
    const profileQuery = useUserProfile(userId);
    const libraryQuery = useUserLibrary(profileQuery.data?.userId);
    const collectionEntriesQuery = useCollectionEntriesForUserId(userId, 0, 1);
    const reviewsQuery = useReviewsForUserId(userId, 0, 1);
    const followersCountQuery = useFollowersCount(userId);
    const obtainedAchievementsQuery = useAllObtainedAchievements(userId);

    const featuredAchievement = useMemo(() => {
        if (obtainedAchievementsQuery.data == undefined) return null;
        return obtainedAchievementsQuery.data.find(
            (achievement) => achievement.isFeatured,
        );
    }, [obtainedAchievementsQuery.data]);

    const shouldShowFollowActions =
        ownUserId != undefined && ownUserId !== userId;

    if (profileQuery.isLoading) {
        return <CenteredLoading />;
    } else if (profileQuery.data == undefined) {
        return null;
    }

    return (
        <Paper
            className={"w-full h-full p-1"}
            styles={{
                root: {
                    backgroundColor: "#161616",
                },
            }}
        >
            <Stack className={"w-full h-full items-center p-2"}>
                <UserAvatar userId={userId} size={"8rem"} />
                <Text fw={"bold"}>{profileQuery.data.username}</Text>
                <Box w={"80%"}>
                    <UserLevelInfo targetUserId={profileQuery.data?.userId} />
                </Box>
                <Stack className={"w-full h-full mt-8"}>
                    <Link href={`/library/${profileQuery.data?.userId}`}>
                        <Group className={"w-full justify-between px-4"}>
                            <Title size={"h5"}>Games</Title>
                            <Text>
                                {collectionEntriesQuery.data?.pagination
                                    .totalItems || 0}
                            </Text>
                        </Group>
                    </Link>
                    <Divider />
                    <Group className={"w-full justify-between px-4"}>
                        <Title size={"h5"}>Reviews</Title>
                        <Text>
                            {reviewsQuery.data?.pagination?.totalItems || 0}
                        </Text>
                    </Group>
                    <Divider />

                    <Group className={"w-full justify-between px-4"}>
                        <Title size={"h5"}>Achievements</Title>
                        <Text>
                            {obtainedAchievementsQuery.data?.length || 0}
                        </Text>
                    </Group>
                    <Divider />
                    <Link href={`/library/${profileQuery.data?.userId}`}>
                        <Group className={"w-full justify-between px-4"}>
                            <Title size={"h5"}>Collections</Title>
                            <Text>
                                {libraryQuery.data?.collections.length || 0}
                            </Text>
                        </Group>
                    </Link>
                    <Divider />
                    <Group className={"w-full justify-between px-4"}>
                        <Title size={"h5"}>Followers</Title>
                        <Text>{followersCountQuery.data}</Text>
                    </Group>
                </Stack>
                {shouldShowFollowActions && (
                    <Box className={"w-full mt-6"}>
                        <ProfileFollowActions targetUserId={userId} />
                    </Box>
                )}
                <Text className={"mt-4"} fz={"0.9rem"}>
                    {profileQuery.data.bio}
                </Text>
                {featuredAchievement && (
                    <ObtainedAchievementItem
                        targetUserId={profileQuery.data.userId}
                        obtainedAchievementId={featuredAchievement.id}
                    />
                )}
                <Text className={"mt-4"} fz={"0.8rem"} c={"dimmed"}>
                    Joined at{" "}
                    {dateFormater.format(new Date(profileQuery.data.createdAt))}
                </Text>
            </Stack>
        </Paper>
    );
};

export default ProfileUserInfo;
