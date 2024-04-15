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
    console.log(imageUrl);
    console.log(reviewQuery.data, gameQuery.data);
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
                    <Stack w={"100%"}>
                        <Title className={"text-sm"}>
                            {gameQuery.data?.name}
                        </Title>
                        <Text c={"dimmed"} className={"text-xs"}>
                            Reviewed
                        </Text>
                    </Stack>
                </Box>
                <Box className={"w-6/12 lg:w-3/12 ms-auto h-full"}>
                    <Stack
                        className={
                            "w-full h-full items-end justify-end lg:pe-5"
                        }
                    >
                        <Stack className={"gap-4 py-4 items-end"}>
                            <GameRating
                                value={reviewQuery.data?.rating}
                                size={"md"}
                            />
                            <Group>
                                <ActivityItemLikes activityId={activity.id} />
                            </Group>
                        </Stack>
                    </Stack>
                </Box>
            </Group>
        </Box>
    );
};

export default ReviewActivityItem;
