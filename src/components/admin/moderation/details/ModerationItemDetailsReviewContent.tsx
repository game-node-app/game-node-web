import React, { useEffect, useMemo, useState } from "react";
import { Review } from "@/wrapper/server";
import { EditorContent, useEditor } from "@tiptap/react";
import { Box, Paper, Stack, Text } from "@mantine/core";
import { useReview } from "@/components/review/hooks/useReview";
import CenteredLoading from "@/components/general/CenteredLoading";
import { StarterKit } from "@tiptap/starter-kit";
import { DEFAULT_REVIEW_EDITOR_EXTENSIONS } from "@/components/game/info/review/editor/GameInfoReviewEditor";
import Link from "next/link";
import TextLink from "@/components/general/TextLink";

interface Props {
    reviewId: string;
}

const ModerationItemDetailsReviewContent = ({ reviewId }: Props) => {
    const reviewQuery = useReview(reviewId);

    const [content, setContent] = useState("");

    const nonEditableEditor = useEditor(
        {
            editable: false,
            extensions: DEFAULT_REVIEW_EDITOR_EXTENSIONS,
            content: content,
        },
        [content],
    );

    useEffect(() => {
        if (reviewQuery.data != undefined && reviewQuery.data.content) {
            const content = reviewQuery.data.content;
            if (content.length >= 240) {
                setContent(content.slice(0, 240) + "...");
            } else {
                setContent(content);
            }
        }
    }, [reviewQuery.data]);

    if (reviewQuery.isLoading) {
        return <CenteredLoading />;
    } else if (
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

export default ModerationItemDetailsReviewContent;
