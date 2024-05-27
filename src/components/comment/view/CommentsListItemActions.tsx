import React, { useMemo } from "react";
import { CommentStatistics, FindOneStatisticsDto } from "@/wrapper/server";
import { useItemStatistics } from "@/components/statistics/hooks/useItemStatistics";
import { FindAllCommentsDto } from "@/wrapper/server";
import { UserComment } from "@/components/comment/types";
import { ActionIcon, Group, Text } from "@mantine/core";
import { redirectToAuth } from "supertokens-auth-react";
import { IconThumbUp } from "@tabler/icons-react";
import { useUserLike } from "@/components/statistics/hooks/useUserLike";
import useUserId from "@/components/auth/hooks/useUserId";
import ItemDropdown from "@/components/general/input/dropdown/ItemDropdown";
import CommentsRemoveModal from "@/components/comment/view/CommentsRemoveModal";
import { useDisclosure } from "@mantine/hooks";

interface Props {
    comment: UserComment;
    onEditStart: (commentId: string) => void;
}

const CommentsListItemActions = ({ comment, onEditStart }: Props) => {
    const ownUserId = useUserId();
    const statisticsType = useMemo(() => {
        if (comment.reviewId != undefined) {
            return FindOneStatisticsDto.sourceType.REVIEW_COMMENT;
        }

        return FindOneStatisticsDto.sourceType.REVIEW_COMMENT;
    }, [comment]);

    const [removeModalOpened, removeModalUtils] = useDisclosure();

    const [likesCount, isLiked, toggleUserLike] = useUserLike({
        sourceId: comment.id,
        sourceType: statisticsType,
        targetUserId: comment.profileUserId,
    });

    const isOwnComment =
        ownUserId != undefined && comment.profileUserId === ownUserId;

    return (
        <Group className={"w-full justify-end"}>
            <CommentsRemoveModal
                opened={removeModalOpened}
                onClose={removeModalUtils.close}
                comment={comment}
            />
            <ActionIcon
                onClick={async () => {
                    if (!ownUserId) {
                        redirectToAuth();
                        return;
                    }
                    toggleUserLike();
                }}
                variant={isLiked ? "filled" : "subtle"}
                size={"xl"}
                color={isLiked ? "brand" : "white"}
                data-disabled={!ownUserId}
            >
                <IconThumbUp />
                <Text>{likesCount}</Text>
            </ActionIcon>

            <ItemDropdown>
                {isOwnComment && (
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
                )}
                <ItemDropdown.ReportButton onClick={() => {}} disabled={true} />
            </ItemDropdown>
        </Group>
    );
};

export default CommentsListItemActions;
