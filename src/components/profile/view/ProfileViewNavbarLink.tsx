import React, { ComponentPropsWithoutRef } from "react";
import { Divider, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

interface Props extends ComponentPropsWithoutRef<typeof Link> {
    title: string;
    itemCount?: number;
}

const ProfileViewNavbarLink = ({
    title,
    itemCount = 0,
    ...linkProps
}: Props) => {
    return (
        <Link
            className={"w-full h-full flex flex-col items-center gap-1.5"}
            {...linkProps}
        >
            <Text className={"text-lg lg:text-xl text-center"}>{title}</Text>
            <Divider className={"w-full"} />
            <Text className={"text-sm text-dimmed"}>{itemCount}</Text>
        </Link>
    );
};

export default ProfileViewNavbarLink;
