import React, { useMemo, useState } from "react";
import useReviewsForGameId from "@/components/review/hooks/useReviewsForGameId";
import { Group, Pagination, Stack } from "@mantine/core";
import ReviewListItem from "@/components/review/view/ReviewListItem";
import {
    FindReviewDto,
    FindReviewPaginatedDto,
    Review,
} from "@/wrapper/server";
import useOnMobile from "@/hooks/useOnMobile";

interface IReviewListViewProps {
    gameId: number;
}

const ReviewListView = ({ gameId }: IReviewListViewProps) => {
    const onMobile = useOnMobile();
    const DEFAULT_LIMIT = 5;
    const [reviewsDto, setReviewsDto] = useState<FindReviewDto>({
        limit: DEFAULT_LIMIT,
        offset: 0,
        relations: {
            profile: true,
            reviewStatistics: true,
        },
    });
    const reviewsQuery = useReviewsForGameId(gameId, reviewsDto);
    const reviewsQueryPagination = reviewsQuery.data?.pagination;
    const isReviewsEmpty =
        reviewsQuery.data == undefined ||
        reviewsQuery.data.data == undefined ||
        reviewsQuery.data.data.length === 0;

    const list = useMemo(() => {
        if (isReviewsEmpty) return null;
        const revArray = reviewsQuery.data!.data.map((review, index) => {
            return <ReviewListItem key={review.id} review={review} />;
        });
        const arr = Array(10);
        return arr.fill(revArray[0]);
    }, [isReviewsEmpty, reviewsQuery.data]);
    return (
        <Stack w={"100%"} justify={"space-between"}>
            <Stack w={"100%"}>{list}</Stack>
            <Group w={"100%"} justify={"center"}>
                <Pagination
                    total={reviewsQueryPagination?.totalPages ?? 1}
                    onChange={(page) => {
                        const offset = (page - 1) * DEFAULT_LIMIT;
                        setReviewsDto({
                            ...reviewsDto,
                            offset,
                        });
                    }}
                />
            </Group>
        </Stack>
    );
};

export default ReviewListView;
