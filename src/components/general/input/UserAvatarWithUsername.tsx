import React, { useState } from "react";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import {
    AvatarProps,
    Box,
    Overlay,
    Skeleton,
    Stack,
    Text,
} from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import Link from "next/link";

interface Props extends AvatarProps {
    userId: string;
}

const UserAvatarWithUsername = ({ userId, ...avatarProps }: Props) => {
    const onMobile = useOnMobile();
    const [internalOverlayVisible, setInternalOverlayVisible] = useState(false);
    const profileQuery = useUserProfile(userId);
    const username = profileQuery.data?.username;
    const overlayVisible = onMobile || internalOverlayVisible;

    return (
        <Link
            href={`/profile/${profileQuery.data?.userId}`}
            className={"w-fit"}
        >
            <Stack
                justify={"end"}
                align={"center"}
                pos={"relative"}
                w={"fit-content"}
                gap={"0.25rem"}
                p={"0.25rem"}
                onMouseEnter={() => setInternalOverlayVisible(true)}
                onMouseLeave={() => setInternalOverlayVisible(false)}
            >
                <UserAvatar
                    userId={userId}
                    radius={"sm"}
                    pos={"relative"}
                    className={"z-10"}
                    {...avatarProps}
                />
                {overlayVisible && (
                    <Overlay
                        gradient={
                            "linear-gradient(180deg, rgba(30,30,30,0.7973390039609594) 0%, rgba(30,30,30,0.772128919927346) 100%)"
                        }
                        backgroundOpacity={0.6}
                        className={"z-10 rounded"}
                    />
                )}
                {overlayVisible && (
                    <Box className={"w-14 z-20"} pos={"absolute"}>
                        {profileQuery.isLoading && (
                            <Skeleton className={"h-4 w-full"} />
                        )}
                        {username && (
                            <Text fz={"xs"} lineClamp={2}>
                                {username}
                            </Text>
                        )}
                    </Box>
                )}
            </Stack>
        </Link>
    );
};

export default UserAvatarWithUsername;
