import React, { useMemo } from "react";
import type { ReviewComment } from "@/wrapper/server";
import { EditorContent, useEditor } from "@tiptap/react";
import { COMMENT_EDITOR_EXTENSIONS } from "@/components/comment/editor/CommentEditor";
import { Box, Flex, Group, Stack } from "@mantine/core";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { UserAvatarGroup } from "@/components/general/input/UserAvatarGroup";
import getTimeSinceString from "@/util/getTimeSinceString";
import ActivityCreateDate from "@/components/activity/item/ActivityCreateDate";

interface Props {
    comment: ReviewComment;
}

const CommentsListItem = ({ comment }: Props) => {
    const onMobile = useOnMobile();
    const contentToUse = useMemo(() => {
        return comment.content;
    }, [comment]);
    const nonEditableEditor = useEditor({
        extensions: COMMENT_EDITOR_EXTENSIONS,
        editable: false,
        content: contentToUse,
    });

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
                    <EditorContent
                        editor={nonEditableEditor}
                        className={"w-full"}
                    />
                </Stack>
            </Group>
        </Stack>
    );
};

export default CommentsListItem;
