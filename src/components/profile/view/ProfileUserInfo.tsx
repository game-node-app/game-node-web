import React, { useMemo } from "react";
import { Box, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import useCollectionEntriesForUserId from "@/components/collection/collection-entry/hooks/useCollectionEntriesForUserId";
import useReviewsForUserId from "@/components/review/hooks/useReviewsForUserId";
import UserLevelInfo from "@/components/user-level/UserLevelInfo";
import CenteredLoading from "@/components/general/CenteredLoading";
import { useAllObtainedAchievements } from "@/components/achievement/hooks/useAllObtainedAchievements";
import ObtainedAchievementItem from "@/components/achievement/ObtainedAchievementItem";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import ProfileFollowActions from "@/components/profile/view/ProfileFollowActions";
import useUserId from "@/components/auth/hooks/useUserId";
import TitleLink from "@/components/general/TitleLink";
import { useInfiniteFollowInfo } from "@/components/follow/hooks/useInfiniteFollowInfo";
import { FollowInfoRequestDto } from "@/wrapper/server";
import ProfileUserInfoFollowInfo from "@/components/profile/view/ProfileUserInfoFollowInfo";
import criteria = FollowInfoRequestDto.criteria;

const dateFormatter = new Intl.DateTimeFormat();

interface Props {
    userId: string;
}
const ProfileUserInfo = ({ userId }: Props) => {
    const ownUserId = useUserId();
    const profileQuery = useUserProfile(userId);
    const libraryQuery = useUserLibrary(profileQuery.data?.userId);
    const collectionEntriesQuery = useCollectionEntriesForUserId(userId, 0, 1);
    const reviewsQuery = useReviewsForUserId(userId, 0, 1);
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
                    <Group className={"w-full justify-between px-4"}>
                        <TitleLink
                            href={`/library/${profileQuery.data?.userId}`}
                            size={"h5"}
                        >
                            Games
                        </TitleLink>
                        <Text>
                            {collectionEntriesQuery.data?.pagination
                                .totalItems || 0}
                        </Text>
                    </Group>
                    <Divider />
                    <Group className={"w-full justify-between px-4"}>
                        <TitleLink
                            href={`/profile/${userId}/reviews`}
                            size={"h5"}
                        >
                            Reviews
                        </TitleLink>
                        <Text>
                            {reviewsQuery.data?.pagination?.totalItems || 0}
                        </Text>
                    </Group>
                    <Divider />
                    <Group className={"w-full justify-between px-4"}>
                        <TitleLink href={`/achievements/${userId}`} size={"h5"}>
                            Achievements
                        </TitleLink>
                        <Text>
                            {obtainedAchievementsQuery.data?.length || 0}
                        </Text>
                    </Group>
                    <Divider />
                    <Group className={"w-full justify-between px-4"}>
                        <TitleLink
                            href={`/library/${profileQuery.data?.userId}`}
                            size={"h5"}
                        >
                            Collections
                        </TitleLink>
                        <Text>
                            {libraryQuery.data?.collections.length || 0}
                        </Text>
                    </Group>
                    <Divider />
                    <ProfileUserInfoFollowInfo
                        targetUserId={userId}
                        criteria={criteria.FOLLOWERS}
                    />
                    <Divider />
                    <ProfileUserInfoFollowInfo
                        targetUserId={userId}
                        criteria={criteria.FOLLOWING}
                    />
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
                        achievementId={featuredAchievement.achievementId}
                    />
                )}
                <Text className={"mt-4"} fz={"0.8rem"} c={"dimmed"}>
                    Joined at{" "}
                    {dateFormatter.format(
                        new Date(profileQuery.data.createdAt),
                    )}
                </Text>
            </Stack>
        </Paper>
    );
};

export default ProfileUserInfo;
