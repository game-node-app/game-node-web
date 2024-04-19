import React from "react";
import { Activity } from "@/wrapper/server";
import { useUserFollow } from "@/components/follow/hooks/useUserFollow";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { Box, Group, Paper, Text, Title } from "@mantine/core";
import UserAvatarWithUsername from "@/components/general/input/UserAvatarWithUsername";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import Link from "next/link";
import TextLink from "@/components/general/TextLink";

interface Props {
    activity: Activity;
}

const UserFollowActivityItem = ({ activity }: Props) => {
    const onMobile = useOnMobile();
    const userFollowQuery = useUserFollow(activity.userFollowId!);

    const followerUserId = userFollowQuery.data?.followerUserId;
    const followedUserId = userFollowQuery.data?.followedUserId;

    const followerUserProfile = useUserProfile(followerUserId);
    const followedUserProfile = useUserProfile(followedUserId);

    if (!followerUserId || !followedUserId) return null;

    return (
        <Paper className={"relative w-full h-[120px] rounded-md"}>
            <Group
                className={
                    "w-full h-full relative items-center px-3 flex-nowrap gap-4"
                }
            >
                <Box className={"w-3/12 lg:w-1/12"}>
                    <UserAvatarWithUsername
                        userId={followerUserId}
                        size={onMobile ? "lg" : "xl"}
                    />
                </Box>
                <Box className={"w-6/12 lg:w-6/12"}>
                    <Text>
                        <TextLink href={`/profile/${followerUserId}`} span>
                            {followerUserProfile.data?.username}
                        </TextLink>{" "}
                        started following{" "}
                        <TextLink href={`/profile/${followedUserId}`} span>
                            {followedUserProfile.data?.username}
                        </TextLink>
                    </Text>
                </Box>
                <Box className={"ms-auto w-3/12 lg:w-1/12 lg:me-8"}>
                    <UserAvatarWithUsername
                        userId={followedUserId}
                        size={onMobile ? "lg" : "xl"}
                    />
                </Box>
            </Group>
        </Paper>
    );
};

export default UserFollowActivityItem;
