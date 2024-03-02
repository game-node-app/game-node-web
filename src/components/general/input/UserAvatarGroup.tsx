import { Profile } from "@/wrapper/server";
import Link from "next/link";
import { Group, Text } from "@mantine/core";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import React from "react";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useOnMobile from "@/components/general/hooks/useOnMobile";

interface IProps {
    userId: string;
}

export const UserAvatarGroup = ({ userId }: IProps) => {
    const profileQuery = useUserProfile(userId);
    const onMobile = useOnMobile();
    return (
        <Link href={`/profile/${profileQuery.data?.userId}`}>
            <Group
                wrap={"wrap"}
                justify={"center"}
                gap={onMobile ? undefined : 5}
            >
                <UserAvatar avatar={profileQuery.data?.avatar} />
                <Text c={"white"}>{profileQuery.data?.username}</Text>
            </Group>
        </Link>
    );
};
