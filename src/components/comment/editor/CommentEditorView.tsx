import React, { useRef, useState } from "react";
import { ActionIcon, Box, Button, Group, Stack } from "@mantine/core";
import CommentEditor from "@/components/comment/editor/CommentEditor";
import { IconX } from "@tabler/icons-react";
import { Editor } from "@tiptap/core";
import {
    useMutation,
    UseMutationOptions,
    useQueryClient,
} from "@tanstack/react-query";
import { CommentService } from "@/wrapper/server";
import { CreateCommentDto } from "@/wrapper/server";
import { notifications } from "@mantine/notifications";

interface Props {
    /**
     * If available, user will be able to modify this comment.
     */
    commentId?: string;
    sourceType: CreateCommentDto.sourceType;
    sourceId: string;
}

const CommentEditorView = ({ commentId, sourceType, sourceId }: Props) => {
    const queryClient = useQueryClient();
    const [content, setContent] = useState<string>("");
    const editorRef = useRef<Editor>();
    const [shouldShowActionButtons, setShouldShowActionButtons] =
        useState(false);

    const commentMutation = useMutation({
        mutationFn: async () => {
            if (commentId) {
                return CommentService.commentControllerUpdate(commentId, {
                    sourceType,
                    content,
                });
            }

            return CommentService.commentControllerCreate({
                sourceId,
                sourceType,
                content,
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["comments", sourceType, sourceId],
            });
        },
        onSuccess: () => {
            notifications.show({
                color: "green",
                message: "Successfully submitted your comment!",
            });
        },
    });

    return (
        <Stack className={"w-full h-full"}>
            <CommentEditor
                onFocus={() => setShouldShowActionButtons(true)}
                content={content}
                onBlur={(props) => {
                    const html = props.editor.getHTML();
                    setContent(html ?? "");
                }}
                onCreate={(props) => {
                    editorRef.current = props.editor;
                }}
            />
            {shouldShowActionButtons && (
                <Group className={"w-full justify-end"}>
                    <ActionIcon
                        size={"lg"}
                        variant={"default"}
                        onClick={() => {
                            setContent("");
                            editorRef.current?.commands.clearContent();
                            setShouldShowActionButtons(false);
                        }}
                    >
                        <IconX />
                    </ActionIcon>
                    <Button
                        type={"button"}
                        loading={commentMutation.isPending}
                        onClick={() => {
                            commentMutation.mutate();
                        }}
                    >
                        Submit
                    </Button>
                </Group>
            )}
        </Stack>
    );
};

export default CommentEditorView;
