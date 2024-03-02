import { Profile } from "@/wrapper/server";
import Link from "next/link";
import { AvatarProps, Group, Text } from "@mantine/core";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import React from "react";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useOnMobile from "@/components/general/hooks/useOnMobile";

interface IProps extends AvatarProps {
    userId: string;
}

export const UserAvatarGroup = ({ userId, ...others }: IProps) => {
    const profileQuery = useUserProfile(userId);
    const onMobile = useOnMobile();
    return (
        <Link href={`/profile/${profileQuery.data?.userId}`}>
            <Group
                wrap={"wrap"}
                justify={"center"}
                gap={onMobile ? undefined : 5}
            >
                <UserAvatar {...others} avatar={profileQuery.data?.avatar} />
                <Text c={"white"}>{profileQuery.data?.username}</Text>
            </Group>
        </Link>
    );
};
