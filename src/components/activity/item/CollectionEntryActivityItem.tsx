import React from "react";
import { Activity } from "@/wrapper/server";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useReview } from "@/components/review/hooks/useReview";
import { useGame } from "@/components/game/hooks/useGame";
import {
    getSizedImageUrl,
    ImageSize,
} from "@/components/game/util/getSizedImageUrl";
import { Box, Group, Overlay, Stack, Text, Title } from "@mantine/core";
import UserAvatarWithUsername from "@/components/general/input/UserAvatarWithUsername";
import GameRating from "@/components/general/input/GameRating";
import ActivityItemLikes from "@/components/activity/input/ActivityItemLikes";
import { useCollectionEntry } from "@/components/collection/collection-entry/hooks/useCollectionEntry";
import { useCollection } from "@/components/collection/hooks/useCollection";
import Link from "next/link";
import TitleLink from "@/components/general/TitleLink";
import TextLink from "@/components/general/TextLink";

interface Props {
    activity: Activity;
}

const CollectionEntryActivityItem = ({ activity }: Props) => {
    const onMobile = useOnMobile();
    const collectionEntryQuery = useCollectionEntry(
        activity.collectionEntryId!,
    );
    const collectionQuery = useCollection(activity.collectionId!);
    const gameId = collectionEntryQuery.data?.gameId;
    const gameQuery = useGame(gameId, {
        relations: {
            cover: true,
        },
    });
    const imageUrl = getSizedImageUrl(
        gameQuery.data?.cover?.url,
        onMobile ? ImageSize.SCREENSHOT_MED : ImageSize.SCREENSHOT_BIG,
    );
    const isError = collectionQuery.isError || collectionEntryQuery.isError;
    if (isError) {
        return null;
    }

    const collectionEntryCreateDate = collectionEntryQuery.data
        ? new Date(collectionEntryQuery.data.createdAt)
        : new Date();
    return (
        <Box
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className={"relative w-full h-[120px] rounded-md"}
        >
            <Overlay backgroundOpacity={0.6} className={"z-0"}></Overlay>
            <Group
                className={
                    "w-full h-full relative z-20 items-center px-3 flex-nowrap"
                }
            >
                <Box className={"w-3/12 lg:w-1/12"}>
                    <UserAvatarWithUsername
                        userId={activity.profileUserId}
                        size={onMobile ? "lg" : "xl"}
                    />
                </Box>
                <Box className={"w-3/12"}>
                    <Stack gap={10}>
                        <Link href={`/game/${gameQuery.data?.id}`}>
                            <Title className={"text-sm lg:text-md"}>
                                {gameQuery.data?.name}
                            </Title>
                        </Link>
                        <Text fz={"sm"} c={"dimmed"}>
                            Added at{" "}
                            {collectionEntryCreateDate.toLocaleDateString()}
                        </Text>
                    </Stack>
                </Box>
                <Box className={"w-6/12 lg:w-3/12 ms-auto h-full"}>
                    <Stack
                        className={
                            "w-full h-full items-end justify-end lg:pe-5"
                        }
                    >
                        <Stack className={"gap-4 py-2 items-end"}>
                            <Link
                                href={`/library/${activity.profileUserId}/collection/${activity.collectionId}`}
                            >
                                <Title size={"h3"} lineClamp={2}>
                                    {collectionQuery.data?.name}
                                </Title>
                            </Link>

                            <Group mt={"auto"}>
                                <ActivityItemLikes activityId={activity.id} />
                            </Group>
                        </Stack>
                    </Stack>
                </Box>
            </Group>
        </Box>
    );
};

export default CollectionEntryActivityItem;
