import React, { useMemo } from "react";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useUserId from "@/components/auth/hooks/useUserId";
import { useFollowStatus } from "@/components/follow/hooks/useFollowStatus";
import {
    ActionIcon,
    Button,
    Center,
    Group,
    Stack,
    Text,
    Tooltip,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useFollowersCount } from "@/components/follow/hooks/useFollowersCount";
import { FollowService } from "@/wrapper/server";
import { IconX } from "@tabler/icons-react";
import UserFollowActions from "@/components/follow/input/UserFollowActions";

interface Props {
    targetUserId: string;
    withUnfollowButton?: boolean;
}

const ProfileFollowActions = ({
    targetUserId,
    withUnfollowButton = true,
}: Props) => {
    const ownUserId = useUserId();
    /*
    Checks if current logged-in user is following target user
     */
    const ownToTargetFollowStatus = useFollowStatus(ownUserId, targetUserId);
    const targetToOwnFollowStatus = useFollowStatus(targetUserId, ownUserId);

    const isFollowing = ownToTargetFollowStatus.data?.isFollowing ?? false;
    const isBeingFollowed = targetToOwnFollowStatus.data?.isFollowing ?? false;
    const isFollowedBack = isFollowing && isBeingFollowed;

    return (
        <Stack w={"100%"} align={"center"}>
            <UserFollowActions targetUserId={targetUserId} />
            {isBeingFollowed && !isFollowedBack && (
                <Text fz={"0.8rem"} c={"dimmed"}>
                    This user is following you.
                </Text>
            )}
            {isFollowedBack && (
                <Text fz={"0.8rem"} c={"dimmed"}>
                    You follow each other.
                </Text>
            )}
        </Stack>
    );
};

export default ProfileFollowActions;
