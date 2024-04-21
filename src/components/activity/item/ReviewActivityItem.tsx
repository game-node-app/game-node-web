import React from "react";
import { Box, Group, Overlay, Stack, Text, Title } from "@mantine/core";
import { Activity } from "@/wrapper/server";
import { useReview } from "@/components/review/hooks/useReview";
import { useGame } from "@/components/game/hooks/useGame";
import {
    getSizedImageUrl,
    ImageSize,
} from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import { IconThumbUp } from "@tabler/icons-react";
import ActivityItemLikes from "@/components/activity/input/ActivityItemLikes";
import GameRating from "@/components/general/input/GameRating";
import UserAvatarWithUsername from "@/components/general/input/UserAvatarWithUsername";
import Link from "next/link";
import getTimeSinceString from "@/util/getTimeSinceString";

interface Props {
    activity: Activity;
}

const ReviewActivityItem = ({ activity }: Props) => {
    const onMobile = useOnMobile();
    const reviewQuery = useReview(activity.reviewId!);
    const gameId = reviewQuery.data?.gameId;
    const gameQuery = useGame(gameId, {
        relations: {
            cover: true,
        },
    });
    const imageUrl = getSizedImageUrl(
        gameQuery.data?.cover?.url,
        onMobile ? ImageSize.SCREENSHOT_MED : ImageSize.SCREENSHOT_BIG,
    );
    const reviewCreateDate = reviewQuery.data
        ? new Date(reviewQuery.data.createdAt)
        : new Date();

    const timeSince = getTimeSinceString(reviewCreateDate);

    return (
        <Box
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className={"relative w-full h-[160px] rounded-md"}
        >
            <Overlay backgroundOpacity={0.8} className={"z-0"}></Overlay>
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
                    <Stack gap={5}>
                        <Link href={`/game/${gameQuery.data?.id}`}>
                            <Title className={"text-sm lg:text-md"}>
                                {gameQuery.data?.name}
                            </Title>
                        </Link>
                        <Text c={"dimmed"} fz={"sm"}>
                            Reviewed
                        </Text>
                    </Stack>
                </Box>
                <Box className={"w-6/12 lg:w-3/12 ms-auto h-full"}>
                    <Stack
                        className={
                            "w-full h-full items-end justify-between lg:pe-5 py-4"
                        }
                    >
                        <Text c={"dimmed"} fz={"sm"}>
                            {timeSince} ago
                        </Text>
                        <GameRating
                            value={reviewQuery.data?.rating}
                            size={"md"}
                        />
                        <Group>
                            <ActivityItemLikes activityId={activity.id} />
                        </Group>
                    </Stack>
                </Box>
            </Group>
        </Box>
    );
};

export default ReviewActivityItem;
