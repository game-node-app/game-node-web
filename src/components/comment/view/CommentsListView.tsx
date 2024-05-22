import React from "react";
import {
    useComments,
    UseCommentsProps,
} from "@/components/comment/hooks/useComments";
import { Paper, Stack } from "@mantine/core";

interface Props extends UseCommentsProps {}

const CommentsListView = ({ ...hookProps }: Props) => {
    const commentsQuery = useComments(hookProps);
    console.log(commentsQuery.data);

    return (
        <Paper className={"w-full h-full"}>
            <Stack className={"w-full h-full"}></Stack>
        </Paper>
    );
};

export default CommentsListView;
