import React, { ReactElement, useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { REVIEW_EDITOR_EXTENSIONS } from "@/components/game/info/review/editor/GameInfoReviewEditor";
import { Divider, Flex, Group, Rating, Stack, Text } from "@mantine/core";
import { Review } from "@/wrapper/server";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import useUserId from "@/components/auth/hooks/useUserId";
import ReviewListItemLikes from "@/components/review/view/ReviewListItemLikes";
import ReviewListItemDropdown from "@/components/review/view/ReviewListItemDropdown";
import { UserAvatarGroup } from "@/components/general/input/UserAvatarGroup";

interface IReviewListViewProps {
    review: Review;
    onEditStart?: () => void;
}

const ReviewListItem = ({ review, onEditStart }: IReviewListViewProps) => {
    const onMobile = useOnMobile();
    const [isReadMore, setIsReadMore] = useState<boolean>(false);
    const contentToUse = useMemo(() => {
        if (review != undefined && review.content != undefined) {
            if (review.content.length < 280 || isReadMore) {
                return review.content;
            }
            return review.content.slice(0, 280) + "...";
        }
        return "";
    }, [isReadMore, review]);

    const nonEditableEditor = useEditor(
        {
            extensions: REVIEW_EDITOR_EXTENSIONS,
            content: contentToUse,
            editable: false,
            injectCSS: true,
        },
        [contentToUse],
    );

    const userId = useUserId();
    const profileUserId = review.profileUserId;
    const isOwnReview = userId === profileUserId;

    return (
        <Stack w={"100%"} align={"center"}>
            <Group
                w={"100%"}
                justify={"space-evenly"}
                wrap={onMobile ? "wrap" : "nowrap"}
                onClick={() => setIsReadMore(!isReadMore)}
            >
                <Flex
                    direction={{
                        base: "row",
                        lg: "column",
                    }}
                    w={{
                        base: "100%",
                        lg: "fit-content",
                    }}
                    justify={{
                        base: "space-between",
                        lg: "center",
                    }}
                    align={{
                        lg: "center",
                    }}
                >
                    <UserAvatarGroup userId={profileUserId} />
                    <Rating value={review.rating} />
                </Flex>
                <EditorContent
                    editor={nonEditableEditor}
                    className={"w-full"}
                />
            </Group>
            <Group w={"100%"} justify={"space-between"}>
                <ReviewListItemLikes review={review} />
                <ReviewListItemDropdown
                    review={review}
                    isOwnReview={isOwnReview}
                    onEditStart={onEditStart}
                />
            </Group>
            <Divider w={"100%"} orientation={"horizontal"} />
        </Stack>
    );
};

export default ReviewListItem;
