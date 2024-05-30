import React, { useMemo, useState } from "react";
import {
    useComments,
    UseCommentsProps,
} from "@/components/comment/hooks/useComments";
import { Pagination, Paper, Stack } from "@mantine/core";
import CommentsListItem from "@/components/comment/view/CommentsListItem";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import CenteredLoading from "@/components/general/CenteredLoading";
import GameViewPagination from "@/components/general/view/game/GameViewPagination";

interface Props extends Omit<UseCommentsProps, "limit" | "offset"> {
    onEditStart: (commentId: string) => void;
    editedCommentId?: string;
}

const COMMENTS_LIST_VIEW_DEFAULT_LIMIT = 10;

const CommentsListView = ({
    onEditStart,
    editedCommentId,
    ...hookProps
}: Props) => {
    const [offset, setOffset] = useState(0);
    const offsetAsPage =
        offset >= COMMENTS_LIST_VIEW_DEFAULT_LIMIT
            ? Math.ceil((offset + 1) / COMMENTS_LIST_VIEW_DEFAULT_LIMIT)
            : 1;
    const commentsQuery = useComments({
        ...hookProps,
        offset,
        limit: COMMENTS_LIST_VIEW_DEFAULT_LIMIT,
    });
    const items = useMemo(() => {
        return commentsQuery.data?.data
            .toSorted((a, b) => {
                const aCreateDate = new Date(a.createdAt);
                const bCreateDate = new Date(b.createdAt);
                return aCreateDate.getTime() - bCreateDate.getTime();
            })
            .map((comment) => {
                return (
                    <CommentsListItem
                        key={comment.id}
                        comment={comment}
                        onEditStart={onEditStart}
                        editedCommentId={editedCommentId}
                    />
                );
            });
    }, [commentsQuery.data?.data, editedCommentId, onEditStart]);

    const hasNextPage =
        commentsQuery.data != undefined &&
        commentsQuery.data.pagination.hasNextPage;

    const shouldShowPagination =
        commentsQuery.data != undefined && (offsetAsPage !== 1 || hasNextPage);
    return (
        <Stack className={"w-full h-full"}>
            {commentsQuery.isError && (
                <CenteredErrorMessage
                    message={"Error while fetching comments. Please try again."}
                />
            )}
            {commentsQuery.isLoading && <CenteredLoading />}
            {items}
            {shouldShowPagination && (
                <GameViewPagination
                    page={offsetAsPage}
                    paginationInfo={commentsQuery.data?.pagination}
                    onPaginationChange={(page) => {
                        const pageAsOffset =
                            COMMENTS_LIST_VIEW_DEFAULT_LIMIT * (page - 1);
                        setOffset(pageAsOffset);
                    }}
                />
            )}
        </Stack>
    );
};

export default CommentsListView;
