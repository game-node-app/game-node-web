import React, { useMemo } from "react";
import {
    useComments,
    UseCommentsProps,
} from "@/components/comment/hooks/useComments";
import { Paper, Stack } from "@mantine/core";
import CommentsListItem from "@/components/comment/view/CommentsListItem";

interface Props extends UseCommentsProps {}

const CommentsListView = ({ ...hookProps }: Props) => {
    const commentsQuery = useComments(hookProps);
    const items = useMemo(() => {
        return commentsQuery.data?.data.map((comment) => {
            return <CommentsListItem key={comment.id} comment={comment} />;
        });
    }, [commentsQuery.data]);
    return (
        <Paper className={"w-full h-full"}>
            <Stack className={"w-full h-full"}>{items}</Stack>
        </Paper>
    );
};

export default CommentsListView;
