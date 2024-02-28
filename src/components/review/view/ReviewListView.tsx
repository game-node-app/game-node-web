import React, { useEffect, useMemo, useRef, useState } from "react";
import useReviewsForGameId from "@/components/review/hooks/useReviewsForGameId";
import { Group, Pagination, Stack, Text } from "@mantine/core";
import ReviewListItem from "@/components/review/view/ReviewListItem";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { TBasePaginationRequest } from "@/util/types/pagination";
import { DetailsBox } from "@/components/general/DetailsBox";
import useUserId from "@/components/auth/hooks/useUserId";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

interface IReviewListViewProps {
    gameId: number;
}

const DEFAULT_LIMIT = 7;

const urlQueryToDto = (query: ParsedUrlQuery): TBasePaginationRequest => {
    const dto: TBasePaginationRequest = {};
    const { page } = query;
    if (page && typeof page === "string") {
        const pageInt = parseInt(page, 10);
        dto.offset = DEFAULT_LIMIT * (pageInt - 1);
    }

    return dto;
};

const queryDtoToSearchParams = (dto: TBasePaginationRequest) => {
    const searchParams = new URLSearchParams();
    const limitToUse = dto.limit || DEFAULT_LIMIT;
    if (dto.offset) {
        const offsetAsPage =
            dto.offset > limitToUse ? Math.ceil(dto.offset / limitToUse) : 1;
        searchParams.set("page", `${offsetAsPage}`);
    }
    return searchParams;
};

const ReviewListView = ({ gameId }: IReviewListViewProps) => {
    const onMobile = useOnMobile();
    const router = useRouter();
    const userId = useUserId();
    const hasSetInitialQueryParams = useRef(false);
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

    const handlePagination = (page: number) => {
        const offset = (page - 1) * DEFAULT_LIMIT;
        const updatedDto: TBasePaginationRequest = {
            ...reviewsDto,
            offset,
        };
        const searchParams = queryDtoToSearchParams(updatedDto);
        router.replace({
            query: searchParams.toString(),
        });
        setReviewsDto(updatedDto);
    };

    const reviewsList = useMemo(() => {
        if (isReviewsEmpty) return null;
        const items = reviewsQuery.data!.data.map((review, index) => {
            if (
                review.profileUserId != undefined &&
                review.profileUserId === userId
            )
                return null;
            return <ReviewListItem key={review.id} review={review} />;
        });
        return items.filter((item) => item != undefined);
    }, [isReviewsEmpty, reviewsQuery.data, userId]);

    useEffect(() => {
        if (router.isReady && !hasSetInitialQueryParams.current) {
            const dto = urlQueryToDto(router.query);
            setReviewsDto(dto);
            hasSetInitialQueryParams.current = true;
        }
    }, [router.query, router.isReady, setReviewsDto]);

    if (isReviewsEmpty || reviewsList == undefined) {
        return null;
        // Current user is the sole reviewer
    } else if (reviewsList.length === 0) {
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
                                onChange={handlePagination}
                            />
                        )}
                    </Group>
                </Stack>
            }
        />
    );
};

export default ReviewListView;
