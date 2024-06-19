import React, { useEffect, useState } from "react";
import { FindAllCommentsDto } from "@/wrapper/server";
import { useComment } from "@/components/comment/hooks/useComment";
import { EditorContent, useEditor } from "@tiptap/react";
import { DEFAULT_REVIEW_EDITOR_EXTENSIONS } from "@/components/game/info/review/editor/GameInfoReviewEditor";
import CenteredLoading from "@/components/general/CenteredLoading";
import { COMMENT_EDITOR_EXTENSIONS } from "@/components/comment/editor/CommentEditor";
import { Box, Paper, Stack, Text } from "@mantine/core";
import TextLink from "@/components/general/TextLink";
import { useReview } from "@/components/review/hooks/useReview";

interface Props {
    commentId: string;
    commentType: FindAllCommentsDto.sourceType;
}

const ModerationItemDetailsCommentContent = ({
    commentType,
    commentId,
}: Props) => {
    const commentQuery = useComment(commentId, commentType);
    const reviewQuery = useReview(commentQuery.data?.reviewId);

    const [content, setContent] = useState("");

    const nonEditableEditor = useEditor(
        {
            editable: false,
            extensions: COMMENT_EDITOR_EXTENSIONS,
            content: content,
        },
        [content],
    );

    useEffect(() => {
        if (commentQuery.data != undefined && commentQuery.data.content) {
            const content = commentQuery.data.content;
            if (content.length >= 240) {
                setContent(content.slice(0, 240) + "...");
            } else {
                setContent(content);
            }
        }
    }, [commentQuery.data]);

    if (commentQuery.isLoading || reviewQuery.isLoading) {
        return <CenteredLoading />;
    } else if (
        commentQuery.data == undefined ||
        reviewQuery.data == undefined ||
        nonEditableEditor == undefined ||
        content == undefined
    ) {
        return null;
    }

    return (
        <Paper
            withBorder
            radius={"sm"}
            className={"w-full !bg-[#181818] h-full relative"}
        >
            <Stack className={"relative w-full h-full"}>
                <Box className={"absolute ms-2 mt-2"}>
                    <Text className={"text-sm text-dimmed"}>
                        Reported content
                    </Text>
                </Box>
                <EditorContent
                    editor={nonEditableEditor}
                    className={"w-full mt-6 p-6"}
                />
                <Stack className={"mt-auto items-center"}>
                    <TextLink
                        className={"mb-4"}
                        href={`/game/${reviewQuery.data.gameId}?reviewId=${reviewQuery.data.id}`}
                    >
                        See content
                    </TextLink>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ModerationItemDetailsCommentContent;
