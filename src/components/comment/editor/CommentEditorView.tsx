import React, {
    MutableRefObject,
    RefObject,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    ActionIcon,
    Box,
    Button,
    Group,
    LoadingOverlay,
    Stack,
    Text,
} from "@mantine/core";
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
import { useComment } from "@/components/comment/hooks/useComment";

interface Props {
    /**
     * If available, user will be able to modify this comment. <br>
     * Ideally, should be cleared when 'onCancel' is called.
     */
    commentId?: string;
    /**
     * Triggered when the user clicks the cancel or finishes submitting with success.
     */
    onEditEnd?: () => void;
    sourceType: CreateCommentDto.sourceType;
    sourceId: string;
}

const CommentEditorView = ({
    commentId,
    sourceType,
    sourceId,
    onEditEnd,
}: Props) => {
    const queryClient = useQueryClient();
    const editorRef = useRef<Editor>();
    const commentQuery = useComment(commentId, sourceType);
    const [previousContent, setPreviousContent] = useState<string | undefined>(
        undefined,
    );
    const [shouldShowActionButtons, setShouldShowActionButtons] =
        useState<boolean>(false);

    const clearEditor = () => {
        editorRef.current?.commands.clearContent();
        setShouldShowActionButtons(false);
    };

    const commentMutation = useMutation({
        mutationFn: async () => {
            if (editorRef.current == undefined) return;

            const content = editorRef.current?.getHTML();
            if (commentId) {
                return CommentService.commentControllerUpdate(commentId, {
                    sourceType,
                    content: content,
                });
            }

            return CommentService.commentControllerCreate({
                sourceId,
                sourceType,
                content: content,
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
            clearEditor();
            if (onEditEnd) onEditEnd();
        },
    });

    const isUpdateAction =
        commentId != undefined && commentQuery.data != undefined;

    useEffect(() => {
        if (commentId == undefined && previousContent != undefined) {
            setPreviousContent(undefined);
        }

        if (commentId != undefined && commentQuery.data != undefined) {
            setPreviousContent(commentQuery.data.content);
            setShouldShowActionButtons(true);
        }
    }, [commentId, commentQuery.data, previousContent]);

    return (
        <Stack className={"w-full h-full relative"}>
            <LoadingOverlay visible={commentQuery.isLoading} />
            <CommentEditor
                content={previousContent}
                onUpdate={(props) => {
                    setShouldShowActionButtons(true);
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
                            clearEditor();
                            if (onEditEnd) onEditEnd();
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
                        {isUpdateAction ? "Update" : "Submit"}
                    </Button>
                </Group>
            )}
        </Stack>
    );
};

export default CommentEditorView;
