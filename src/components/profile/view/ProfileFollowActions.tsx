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
        mutationFn: async (action: "register" | "unregister") => {
            if (action === "register" && isFollowing) return;
            if (action === "register") {
                await FollowService.followControllerRegisterFollow({
                    followedUserId: targetUserId,
                });

                return;
            }

            await FollowService.followControllerRemoveFollow({
                followedUserId: targetUserId,
            });
        },
        onSettled: () => {
            followersCountQuery.invalidate();
            ownToTargetFollowStatus.invalidate();
            targetToOwnFollowStatus.invalidate();
        },
    });

    return (
        <Stack w={"100%"} align={"center"}>
            <Group>
                <Button
                    disabled={isFollowing}
                    loading={followMutation.isPending}
                    onClick={() => {
                        followMutation.mutate("register");
                    }}
                >
                    {isFollowing
                        ? "Following"
                        : isBeingFollowed
                          ? "Follow Back"
                          : "Follow"}
                </Button>
                {isFollowing && (
                    <Tooltip label={"Unfollow this user"}>
                        <ActionIcon
                            loading={followMutation.isPending}
                            variant="default"
                            size="lg"
                            onClick={() => {
                                followMutation.mutate("unregister");
                            }}
                        >
                            <IconX color="red" />
                        </ActionIcon>
                    </Tooltip>
                )}
            </Group>

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
