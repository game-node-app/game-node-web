import React, { useMemo, useRef, useState } from "react";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useRouter } from "next/router";
import useUserId from "@/components/auth/hooks/useUserId";
import {
    FindStatisticsTrendingGamesDto,
    FindStatisticsTrendingReviewsDto,
} from "@/wrapper/server";
import { useTrendingReviews } from "@/components/statistics/hooks/useTrendingReviews";
import { useReviews } from "@/components/review/hooks/useReviews";
import ReviewListItem from "@/components/review/view/ReviewListItem";
import { Group, Pagination, Stack, Tabs, Text } from "@mantine/core";
import CenteredLoading from "@/components/general/CenteredLoading";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import { DEFAULT_GAME_REVIEW_LIST_VIEW_DTO } from "@/components/review/view/GameReviewListView";
import { ParsedUrlQuery } from "querystring";
import { TBasePaginationRequest } from "@/util/types/pagination";
import period = FindStatisticsTrendingGamesDto.period;
import { DetailsBox } from "@/components/general/DetailsBox";
import GameView from "@/components/general/view/game/GameView";

const DEFAULT_LIMIT = 7;

export const DEFAULT_USER_REVIEW_LIST_VIEW_DTO: FindStatisticsTrendingReviewsDto =
    {
        period: period.ALL,
        offset: 0,
        limit: DEFAULT_LIMIT,
    };

const urlQueryToDto = (query: ParsedUrlQuery): TBasePaginationRequest => {
    const dto: FindStatisticsTrendingReviewsDto = structuredClone(
        DEFAULT_USER_REVIEW_LIST_VIEW_DTO,
    );
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
            dto.offset > limitToUse
                ? Math.ceil((dto.offset + 1) / limitToUse)
                : 1;
        searchParams.set("page", `${offsetAsPage}`);
    }
    return searchParams;
};

interface IUserViewListView {
    userId: string;
}

const UserReviewListView = ({ userId }: IUserViewListView) => {
    const onMobile = useOnMobile();
    const router = useRouter();
    const ownUserId = useUserId();
    const hasSetInitialQueryParams = useRef(false);

    const [page, setPage] = useState(1);

    const trendingReviewsDto = useMemo((): FindStatisticsTrendingReviewsDto => {
        const offset = (page - 1) * DEFAULT_LIMIT;
        return {
            ...DEFAULT_USER_REVIEW_LIST_VIEW_DTO,
            offset: offset,
            userId: userId,
        };
    }, [page, userId]);
    const trendingReviewsQuery = useTrendingReviews(trendingReviewsDto);
    const trendingReviewsPagination = trendingReviewsQuery.data?.pagination;

    const reviewsIds = trendingReviewsQuery.data?.data.map((s) => s.reviewId!);
    const reviewsQuery = useReviews(reviewsIds);

    const isEmpty =
        reviewsQuery.data == undefined || reviewsQuery.data.length === 0;
    const isLoading = trendingReviewsQuery.isLoading || reviewsQuery.isLoading;
    const isError = trendingReviewsQuery.isError || reviewsQuery.isError;

    const handlePagination = (page: number) => {
        const offset = (page - 1) * DEFAULT_LIMIT;
        const updatedDto: FindStatisticsTrendingReviewsDto = {
            ...trendingReviewsDto,
            offset,
        };
        const searchParams = queryDtoToSearchParams(updatedDto);
        router.replace(
            {
                query: searchParams.toString(),
            },
            undefined,
            {
                shallow: true,
            },
        );
        setPage(page);
    };

    const items = useMemo(() => {
        return reviewsQuery.data?.map((review) => {
            return (
                <ReviewListItem key={review.id} review={review} withGameInfo />
            );
        });
    }, [reviewsQuery.data]);

    if (isLoading) {
        return <CenteredLoading />;
    } else if (isError) {
        return (
            <CenteredErrorMessage
                message={"Failed to fetch reviews. Please try again."}
            />
        );
    } else if (isEmpty) {
        if (userId != undefined && userId === ownUserId) {
            return (
                <Text className={"text-center"}>
                    You have no reviews. Make your first one 😉
                </Text>
            );
        }
        return <Text className={"text-center"}>User has no reviews.</Text>;
    }
    return (
        <Stack w={"100%"} justify={"space-between"}>
            <Stack w={"100%"} align={"start"}>
                {items}
            </Stack>
            {!isEmpty && (
                <GameView.Pagination
                    page={page}
                    paginationInfo={trendingReviewsQuery.data?.pagination}
                    onPaginationChange={handlePagination}
                />
            )}
        </Stack>
    );
};

export default UserReviewListView;
