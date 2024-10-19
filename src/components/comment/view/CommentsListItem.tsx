import React, { useMemo, useState } from "react";
import type { ReviewComment } from "@/wrapper/server";
import { EditorContent, useEditor } from "@tiptap/react";
import { COMMENT_EDITOR_EXTENSIONS } from "@/components/comment/editor/CommentEditor";
import { Box, Divider, Flex, Group, Spoiler, Stack } from "@mantine/core";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { UserAvatarGroup } from "@/components/general/avatar/UserAvatarGroup";
import getTimeSinceString from "@/util/getTimeSinceString";
import ActivityCreateDate from "@/components/activity/item/ActivityCreateDate";
import CommentsListItemActions from "@/components/comment/view/CommentsListItemActions";

interface Props {
    comment: ReviewComment;
    onEditStart: (commentId: string) => void;
    editedCommentId?: string;
}

const CommentsListItem = ({ comment, onEditStart, editedCommentId }: Props) => {
    const [isReadMore, setIsReadMore] = useState(false);
    const onMobile = useOnMobile();

    const nonEditableEditor = useEditor(
        {
            extensions: COMMENT_EDITOR_EXTENSIONS,
            editable: false,
            content: comment?.content,
        },
        [comment],
    );

    const isEditing =
        editedCommentId != undefined && editedCommentId === comment.id;

    if (!nonEditableEditor) return;

    return (
        <Stack className={"w-full h-full"}>
            <Group w={"100%"} justify={"space-evenly"} wrap={"wrap"}>
                <Group className={"w-full flex-nowrap justify-between"}>
                    <Flex
                        justify={{
                            base: "space-between",
                            lg: "start",
                        }}
                        align={{
                            base: "center",
                            lg: "start",
                        }}
                    >
                        <UserAvatarGroup
                            avatarProps={{
                                size: onMobile ? "lg" : "xl",
                            }}
                            userId={comment.profileUserId}
                            groupProps={{
                                gap: "md",
                            }}
                        />
                    </Flex>

                    <ActivityCreateDate createdAtDate={comment.createdAt} />
                </Group>

                <Stack className={"w-full"}>
                    <Spoiler
                        hideLabel={"Show less"}
                        showLabel={"Show more"}
                        expanded={isReadMore}
                        onExpandedChange={setIsReadMore}
                        maxHeight={250}
                    >
                        <EditorContent
                            editor={nonEditableEditor}
                            className={"w-full"}
                        />
                    </Spoiler>
                </Stack>
                <Stack className={"w-full"}>
                    <CommentsListItemActions
                        comment={comment}
                        onEditStart={onEditStart}
                    />
                </Stack>
            </Group>
        </Stack>
    );
};

export default CommentsListItem;
