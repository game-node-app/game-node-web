import React, { useMemo, useState } from "react";
import useReviewsForGameId from "@/components/review/hooks/useReviewsForGameId";
import { Group, Pagination, Stack, Text } from "@mantine/core";
import ReviewListItem from "@/components/review/view/ReviewListItem";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { TBasePaginationRequest } from "@/util/types/pagination";
import { DetailsBox } from "@/components/general/DetailsBox";

interface IReviewListViewProps {
    gameId: number;
}

const DEFAULT_LIMIT = 7;

const ReviewListView = ({ gameId }: IReviewListViewProps) => {
    const onMobile = useOnMobile();
    const [reviewsDto, setReviewsDto] = useState<TBasePaginationRequest>({
        limit: DEFAULT_LIMIT,
        offset: 0,
    });
    const reviewsQuery = useReviewsForGameId(gameId, reviewsDto);
    const reviewsQueryPagination = reviewsQuery.data?.pagination;
    const isReviewsEmpty =
        reviewsQuery.data == undefined ||
        reviewsQuery.data.data == undefined ||
        reviewsQuery.data.data.length === 0;

    const reviewsList = useMemo(() => {
        if (isReviewsEmpty) return null;
        return reviewsQuery.data!.data.map((review, index) => {
            return <ReviewListItem key={review.id} review={review} />;
        });
    }, [isReviewsEmpty, reviewsQuery.data]);

    if (isReviewsEmpty) {
        return null;
    }

    return (
        <DetailsBox
            title={"All reviews"}
            description={"Reader discretion is advised."}
            content={
                <Stack w={"100%"} justify={"space-between"}>
                    <Stack w={"100%"} align={"start"}>
                        {reviewsList}
                    </Stack>
                    <Group w={"100%"} justify={"center"}>
                        {!isReviewsEmpty && (
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
                        )}
                    </Group>
                </Stack>
            }
        />
    );
};

export default ReviewListView;
