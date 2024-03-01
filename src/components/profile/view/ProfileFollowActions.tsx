import React from "react";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useUserId from "@/components/auth/hooks/useUserId";
import { useFollowStatus } from "@/components/follow/hooks/useFollowStatus";
import { Button, Center, Stack, Text } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { useFollowersCount } from "@/components/follow/hooks/useFollowersCount";
import { FollowService } from "@/wrapper/server";

interface Props {
    targetUserId: string;
}

const ProfileFollowActions = ({ targetUserId }: Props) => {
    const ownUserId = useUserId();
    /*
    Checks if current logged-in user is following target user
     */
    const ownToTargetFollowStatus = useFollowStatus(ownUserId, targetUserId);
    const targetToOwnFollowStatus = useFollowStatus(targetUserId, ownUserId);
    const followersCountQuery = useFollowersCount(targetUserId);

    const isFollowing = ownToTargetFollowStatus.data?.isFollowing ?? false;
    const isBeingFollowed = targetToOwnFollowStatus.data?.isFollowing ?? false;
    const isFollowedBack = isFollowing && isBeingFollowed;

    const followMutation = useMutation({
        mutationFn: async () => {
            if (isFollowing) return;
            await FollowService.followControllerRegisterFollow({
                followedUserId: targetUserId,
            });
        },
        onSettled: () => {
            followersCountQuery.invalidate();
            ownToTargetFollowStatus.invalidate();
            targetToOwnFollowStatus.invalidate();
        },
    });

    if (!ownUserId || ownUserId === targetUserId) return null;

    return (
        <Stack w={"100%"} align={"center"}>
            <Button
                disabled={isFollowing}
                loading={followMutation.isPending}
                onClick={() => {
                    followMutation.mutate();
                }}
            >
                {isFollowing ? "Following" : "Follow"}
            </Button>
            {isBeingFollowed && (
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
