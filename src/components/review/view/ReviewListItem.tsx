import React, { ReactElement, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { REVIEW_EDITOR_EXTENSIONS } from "@/components/game/info/review/editor/GameInfoReviewEditor";
import { Box, Divider, Flex, Group, Rating, Stack, Text } from "@mantine/core";
import { Review } from "@/wrapper/server";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import useUserId from "@/components/auth/hooks/useUserId";
import ReviewListItemLikes from "@/components/review/view/ReviewListItemLikes";
import ReviewListItemDropdown from "@/components/review/view/ReviewListItemDropdown";
import { UserAvatarGroup } from "@/components/general/input/UserAvatarGroup";
import { useGame } from "@/components/game/hooks/useGame";
import TextLink from "@/components/general/TextLink";

interface IReviewListViewProps {
    review: Review;
    withGameInfo?: boolean;
    onEditStart?: () => void;
}

const ReviewListItem = ({
    review,
    onEditStart,
    withGameInfo,
}: IReviewListViewProps) => {
    const onMobile = useOnMobile();
    const [isReadMore, setIsReadMore] = useState<boolean>(false);
    const contentToUse = useMemo(() => {
        if (review != undefined && review.content != undefined) {
            if (review.content.length < 280 || isReadMore) {
                return review.content;
            }
            return review.content.slice(0, 280) + "...";
        }
        return undefined;
    }, [isReadMore, review]);

    const nonEditableEditor = useEditor(
        {
            extensions: REVIEW_EDITOR_EXTENSIONS,
            content: contentToUse,
            editable: false,
        },
        [contentToUse],
    );

    const userId = useUserId();
    const profileUserId = review.profileUserId;
    const gameIdToUse = withGameInfo ? review.gameId : undefined;
    const isOwnReview = userId != undefined && userId === profileUserId;

    // Will only be enabled if gameId is not undefined.
    const gameQuery = useGame(gameIdToUse, {});

    return (
        <Stack w={"100%"} align={"center"}>
            <Group
                w={"100%"}
                justify={"space-evenly"}
                wrap={onMobile ? "wrap" : "nowrap"}
            >
                <Flex
                    direction={{
                        base: "row",
                        lg: "column",
                    }}
                    w={{
                        base: "100%",
                        lg: "10%",
                    }}
                    justify={{
                        base: "space-between",
                        lg: "center",
                    }}
                    align={{
                        base: "center",
                        lg: "center",
                    }}
                >
                    <UserAvatarGroup
                        avatarProps={{
                            size: onMobile ? "lg" : "xl",
                        }}
                        userId={profileUserId}
                        groupProps={{
                            justify: onMobile ? "start" : "center",
                        }}
                        withHorizontalBreak={!onMobile}
                    />

                    <Rating
                        readOnly
                        fractions={2}
                        value={review.rating}
                        className={"mt-0 lg:mt-4"}
                    />
                </Flex>
                <Stack className={"w-full"}>
                    <EditorContent
                        editor={nonEditableEditor}
                        className={"w-full"}
                        onClick={() => setIsReadMore(!isReadMore)}
                    />
                    <Group justify={withGameInfo ? "space-between" : "end"}>
                        {withGameInfo && gameQuery.data != undefined && (
                            <Box className={"w-6/12 lg:w-4/12"}>
                                <TextLink
                                    href={`/game/${gameQuery.data?.id}`}
                                    c={"dimmed"}
                                >
                                    {gameQuery.data?.name}
                                </TextLink>
                            </Box>
                        )}
                        <Group>
                            <ReviewListItemLikes review={review} />
                            <ReviewListItemDropdown
                                review={review}
                                isOwnReview={isOwnReview}
                                onEditStart={onEditStart}
                            />
                        </Group>
                    </Group>
                </Stack>
            </Group>
        </Stack>
    );
};

export default ReviewListItem;
