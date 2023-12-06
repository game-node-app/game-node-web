import React from "react";
import { Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import useCollectionEntriesForUserId from "@/components/collection/collection-entry/hooks/useCollectionEntriesForUserId";
import useReviewsForUserId from "@/components/review/hooks/useReviewsForUserId";
import Link from "next/link";

interface Props {
    userId: string;
}
const ProfileUserDescription = ({ userId }: Props) => {
    const profileQuery = useUserProfile(userId);
    const collectionEntriesQuery = useCollectionEntriesForUserId(userId);
    const reviewsQuery = useReviewsForUserId(userId, 0, 1);
    return (
        <Paper className={"w-full h-full p-1"} withBorder>
            <Stack className={"w-full h-full items-center p-2"}>
                <UserAvatar src={undefined} size={"8rem"} />
                <Text>{profileQuery.data?.username}</Text>
                <Stack className={"w-full h-full mt-8"}>
                    <Link href={`/library/${profileQuery.data?.userId}`}>
                        <Group className={"w-full justify-between px-4"}>
                            <Title size={"h5"}>Games</Title>
                            <Text>
                                {collectionEntriesQuery.data?.pagination
                                    .totalItems ?? 0}
                            </Text>
                        </Group>
                    </Link>
                    <Divider />
                    <Group className={"w-full justify-between px-4"}>
                        <Title size={"h5"}>Reviews</Title>
                        <Text>
                            {reviewsQuery.data?.pagination?.totalItems ?? 0}
                        </Text>
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
