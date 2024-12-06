import React, { useMemo } from "react";
import {
    CommentStatistics,
    CreateReportRequestDto,
    FindOneStatisticsDto,
} from "@/wrapper/server";
import { useItemStatistics } from "@/components/statistics/hooks/useItemStatistics";
import { FindAllCommentsDto } from "@/wrapper/server";
import { UserComment } from "@/components/comment/types";
import { ActionIcon, Group, Modal, Stack, Text } from "@mantine/core";
import { redirectToAuth } from "supertokens-auth-react";
import { IconThumbUp } from "@tabler/icons-react";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";
import useUserId from "@/components/auth/hooks/useUserId";
import ItemDropdown from "@/components/general/input/dropdown/ItemDropdown";
import CommentsRemoveModal from "@/components/comment/view/CommentsRemoveModal";
import { useDisclosure } from "@mantine/hooks";
import ReportCreateFormModal from "@/components/report/modal/ReportCreateFormModal";
import ItemLikesButton from "@/components/statistics/input/ItemLikesButton";
import ItemCommentsButton from "@/components/comment/input/ItemCommentsButton";
import { getCommentSourceId } from "@/components/comment/util/getCommentSourceId";
import { getCommentSourceType } from "@/components/comment/util/getCommentSourceType";
import CommentsThreadListView from "@/components/comment/view/CommentsThreadListView";
import CommentEditorView from "@/components/comment/editor/CommentEditorView";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import CommentsThreadButton from "@/components/comment/input/CommentsThreadButton";

interface Props {
    comment: UserComment;
    onEditStart: (commentId: string) => void;
}

const CommentsListItemActions = ({ comment, onEditStart }: Props) => {
    const ownUserId = useUserId();

    const onMobile = useOnMobile();

    const statisticsType = useMemo(() => {
        if (Object.hasOwn(comment, "reviewId")) {
            return FindOneStatisticsDto.sourceType.REVIEW_COMMENT;
        } else if (Object.hasOwn(comment, "activityId")) {
            return FindOneStatisticsDto.sourceType.ACTIVITY_COMMENT;
        }

        return FindOneStatisticsDto.sourceType.REVIEW_COMMENT;
    }, [comment]);

    const reportType = useMemo(() => {
        if (Object.hasOwn(comment, "reviewId")) {
            return CreateReportRequestDto.sourceType.REVIEW_COMMENT;
        } else if (Object.hasOwn(comment, "activityId")) {
            return CreateReportRequestDto.sourceType.ACTIVITY_COMMENT;
        }

        return CreateReportRequestDto.sourceType.REVIEW_COMMENT;
    }, [comment]);

    const [removeModalOpened, removeModalUtils] = useDisclosure();
    const [reportModalOpened, reportModalUtils] = useDisclosure();
    const [commentThreadModalOpened, commentThreadModalUtils] = useDisclosure();

    const sourceId = useMemo(() => {
        return getCommentSourceId(comment);
    }, [comment]);

    const sourceType = useMemo(() => {
        return getCommentSourceType(comment);
    }, [comment]);

    const isOwnComment =
        ownUserId != undefined && comment.profileUserId === ownUserId;

    return (
        <Group className={"w-full justify-end"}>
            <Modal
                title={"Responses to this comment"}
                opened={commentThreadModalOpened}
                onClose={commentThreadModalUtils.close}
                fullScreen={onMobile}
                size={"xl"}
            >
                <Stack className={"w-full h-full"}>
                    <CommentsThreadListView comment={comment} />
                    <CommentEditorView
                        sourceType={sourceType}
                        sourceId={sourceId}
                        childOf={comment.id}
                    />
                </Stack>
            </Modal>
            <CommentsRemoveModal
                opened={removeModalOpened}
                onClose={removeModalUtils.close}
                comment={comment}
            />
            <ReportCreateFormModal
                opened={reportModalOpened}
                onClose={reportModalUtils.close}
                sourceId={comment.id}
                sourceType={reportType}
            />

            <CommentsThreadButton
                comment={comment}
                onClick={commentThreadModalUtils.open}
            />

            <ItemLikesButton
                sourceId={comment.id}
                sourceType={statisticsType}
                targetUserId={comment.profileUserId}
            />

            <ItemDropdown>
                {isOwnComment ? (
                    <>
                        <ItemDropdown.EditButton
                            onClick={() => {
                                onEditStart(comment.id);
                            }}
                            disabled={!isOwnComment}
                        />
                        <ItemDropdown.RemoveButton
                            onClick={() => {
                                removeModalUtils.open();
                            }}
                            disabled={!isOwnComment}
                        />
                    </>
                ) : (
                    <ItemDropdown.ReportButton
                        onClick={() => {
                            reportModalUtils.open();
                        }}
                    />
                )}
            </ItemDropdown>
        </Group>
    );
};

export default CommentsListItemActions;
