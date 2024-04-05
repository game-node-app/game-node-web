import { Profile } from "@/wrapper/server";
import Link from "next/link";
import { AvatarProps, Group, GroupProps, Text, TextProps } from "@mantine/core";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import React from "react";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import Break from "@/components/general/Break";

interface IProps extends AvatarProps {
    userId: string;
    avatarProps?: AvatarProps;
    groupProps?: GroupProps;
    textProps?: TextProps;
    withBreak?: boolean;
}

export const UserAvatarGroup = ({
    userId,
    avatarProps,
    groupProps,
    textProps,
    withBreak,
}: IProps) => {
    const profileQuery = useUserProfile(userId);
    const onMobile = useOnMobile();
    return (
        <Link
            href={`/profile/${profileQuery.data?.userId}`}
            className={"w-full"}
        >
            <Group
                wrap={onMobile ? "nowrap" : "wrap"}
                gap={onMobile ? undefined : 5}
                w={"100%"}
                {...groupProps}
            >
                <UserAvatar {...avatarProps} userId={userId} />
                {withBreak && <Break />}
                <Text
                    c={"white"}
                    lineClamp={2}
                    className={"break-words"}
                    {...textProps}
                >
                    {profileQuery.data?.username}
                </Text>
            </Group>
        </Link>
    );
};
