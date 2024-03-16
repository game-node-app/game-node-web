import React, { useMemo, useRef, useState } from "react";
import {
    ComboboxItem,
    Group,
    Pagination,
    Select,
    Stack,
    Tabs,
    Text,
} from "@mantine/core";
import ReviewListItem from "@/components/review/view/ReviewListItem";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { TBasePaginationRequest } from "@/util/types/pagination";
import { DetailsBox } from "@/components/general/DetailsBox";
import useUserId from "@/components/auth/hooks/useUserId";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useTrendingReviews } from "@/components/statistics/hooks/useTrendingReviews";
import { FindStatisticsTrendingReviewsDto } from "@/wrapper/server";
import { useReviews } from "@/components/review/hooks/useReviews";
import CenteredLoading from "@/components/general/CenteredLoading";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import period = FindStatisticsTrendingReviewsDto.period;

interface IReviewListViewProps {
    gameId: number;
}

const DEFAULT_LIMIT = 7;

export const DEFAULT_REVIEW_LIST_VIEW_DTO: FindStatisticsTrendingReviewsDto = {
    period: period.MONTH,
    offset: 0,
    limit: DEFAULT_LIMIT,
};

const PERIOD_SELECT_DATA: ComboboxItem[] = [
    {
        label: "Recent",
        value: period.MONTH.valueOf(),
    },
    {
        label: "All",
        value: period.ALL.valueOf(),
    },
];

const urlQueryToDto = (query: ParsedUrlQuery): TBasePaginationRequest => {
    const dto: FindStatisticsTrendingReviewsDto = structuredClone(
        DEFAULT_REVIEW_LIST_VIEW_DTO,
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
    const [currentPeriod, setCurrentPeriod] = useState(period.MONTH.valueOf());
    const [offset, setOffset] = useState(0);
    const trendingReviewsDto = useMemo((): FindStatisticsTrendingReviewsDto => {
        return {
            ...DEFAULT_REVIEW_LIST_VIEW_DTO,
            offset: offset,
            gameId: gameId,
            period: currentPeriod as period,
        };
    }, [offset, gameId, currentPeriod]);
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
        setOffset(offset);
    };

    const content = useMemo(() => {
        if (isLoading) {
            return <CenteredLoading />;
        } else if (isError) {
            return (
                <CenteredErrorMessage
                    message={"Failed to fetch reviews. Please try again."}
                />
            );
        }
        const reviews = reviewsQuery.data
            ?.filter(
                (review) =>
                    review != undefined && review.profileUserId !== userId,
            )
            .toSorted((a, b) => {
                const random = Math.random();
                if (random > 0.5) return 1;
                return -1;
            })
            .map((review) => {
                return <ReviewListItem key={review.id} review={review} />;
            });

        if (reviews == undefined || reviews.length === 0) {
            return (
                <Text className={"text-center"}>
                    No reviews yet. Be the first one! 😉
                </Text>
            );
        }

        return reviews;
    }, [isError, isLoading, reviewsQuery.data, userId]);

    return (
        <DetailsBox enabled={content != undefined} title={"Reviews"}>
            <Stack w={"100%"} justify={"space-between"}>
                <Stack w={"100%"} align={"start"}>
                    <Tabs
                        value={currentPeriod}
                        onChange={(v) => setCurrentPeriod(v as period)}
                        w={"100%"}
                    >
                        <Tabs.List grow={onMobile}>
                            <Tabs.Tab value={period.MONTH.valueOf()}>
                                Trending
                            </Tabs.Tab>
                            <Tabs.Tab value={period.ALL.valueOf()}>
                                All
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs>
                    {content}
                </Stack>
                <Group w={"100%"} justify={"center"}>
                    {!isEmpty && (
                        <Pagination
                            total={trendingReviewsPagination?.totalPages ?? 1}
                            onChange={handlePagination}
                        />
                    )}
                </Group>
            </Stack>
        </DetailsBox>
    );
};

export default ReviewListView;
