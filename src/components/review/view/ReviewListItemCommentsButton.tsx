import React, { useMemo } from "react";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconMessages } from "@tabler/icons-react";
import { useComments } from "@/components/comment/hooks/useComments";
import { FindAllCommentsDto } from "@/wrapper/server";
import sourceType = FindAllCommentsDto.sourceType;

interface ReviewListItemCommentsProps {
    reviewId: string;
    onClick: () => void;
}

const ReviewListItemCommentsButton = ({
    onClick,
    reviewId,
}: ReviewListItemCommentsProps) => {
    const commentsQuery = useComments({
        enabled: true,
        offset: 0,
        limit: 10,
        sourceType: sourceType.REVIEW,
        sourceId: reviewId,
        orderBy: {
            createdAt: "DESC",
        },
    });

    const totalReviewsCount = useMemo(() => {
        if (
            commentsQuery.data == undefined ||
            commentsQuery.data.pagination == undefined
        ) {
            return 0;
        }

        return commentsQuery.data.pagination.totalItems;
    }, [commentsQuery.data]);
    return (
        <Group gap={"0.5rem"}>
            <ActionIcon
                onClick={onClick}
                variant={"subtle"}
                size={"xl"}
                color={"white"}
            >
                <IconMessages className={"me-0.5"} />
                <Text>{totalReviewsCount}</Text>
            </ActionIcon>
        </Group>
    );
};

export default ReviewListItemCommentsButton;
