import React from "react";
import { Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { UserAvatar } from "@/components/general/input/UserAvatar";

interface Props {
    userId: string;
}
const ProfileUserDescription = ({ userId }: Props) => {
    const profileQuery = useUserProfile(userId);
    return (
        <Paper className={"w-full h-full p-4"} withBorder>
            <Stack className={"w-full h-full items-center p-2"}>
                <UserAvatar src={undefined} size={"8rem"} />
                <Text>{profileQuery.data?.username}</Text>
                <Stack className={"w-full h-full mt-8"}>
                    <Group className={"w-full justify-between px-4"}>
                        <Title size={"h5"}>Games</Title>
                        <Text>500</Text>
                    </Group>
                    <Divider />
                    <Group className={"w-full justify-between px-4"}>
                        <Title size={"h5"}>Reviews</Title>
                        <Text>500</Text>
                    </Group>
                    <Divider />

                    <Group className={"w-full justify-between px-4"}>
                        <Title size={"h5"}>Achievements</Title>
                        <Text>0</Text>
                    </Group>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ProfileUserDescription;
