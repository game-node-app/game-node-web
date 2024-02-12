import React, { useMemo, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { REVIEW_EDITOR_EXTENSIONS } from "@/components/game/info/review/editor/GameInfoReviewEditor";
import { ActionIcon, Box, Group, Rating, Stack, Text } from "@mantine/core";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import { Profile, Review } from "@/wrapper/server";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import useUserId from "@/components/auth/hooks/useUserId";
import ReviewListItemLikes from "@/components/review/view/ReviewListItemLikes";
import ReviewListItemDropdown from "@/components/review/view/ReviewListItemDropdown";
import Link from "next/link";

interface IReviewListViewProps {
    review: Review;
    onEditStart?: () => void;
}

const UserAvatarGroup = ({ profile }: { profile: Profile }) => {
    return (
        <Link href={`/profile/${profile.userId}`}>
            <Group wrap={"wrap"} justify={"center"}>
                <UserAvatar avatar={profile.avatar} />
                <Text>{profile.username}</Text>
            </Group>
        </Link>
    );
};

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
    const reviewProfile = review.profile;
    const isOwnReview = userId === reviewProfile?.userId;

    return (
        <Stack w={"100%"} align={"center"}>
            <Group
                w={"100%"}
                justify={"space-evenly"}
                wrap={onMobile ? "wrap" : "nowrap"}
                onClick={() => setIsReadMore(!isReadMore)}
            >
                {onMobile ? (
                    <Group w={"100%"} justify={"space-between"}>
                        <UserAvatarGroup profile={review.profile} />
                        <Rating value={review.rating} />
                    </Group>
                ) : (
                    <Stack justify={"center"} align={"center"}>
                        <UserAvatarGroup profile={review.profile} />
                        <Rating value={review.rating} />
                    </Stack>
                )}
                <EditorContent
                    editor={nonEditableEditor}
                    className={"w-full"}
                />
            </Group>
            <Group w={"100%"} justify={"space-between"}>
                <ReviewListItemLikes
                    review={review}
                    isOwnReview={isOwnReview}
                />
                <ReviewListItemDropdown
                    review={review}
                    isOwnReview={isOwnReview}
                    onEditStart={onEditStart}
                />
            </Group>
        </Stack>
    );
};

export default ReviewListItem;
