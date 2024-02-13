import React from "react";
import { useTrendingItems } from "@/components/statistics/hooks/useTrendingItems";
import { Carousel } from "@mantine/carousel";
import { Skeleton } from "@mantine/core";
import { DetailsBox } from "@/components/general/DetailsBox";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import ReviewCard from "@/components/general/card/ReviewCard";

const buildSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 6; i++) {
        skeletons.push(
            <Carousel.Slide key={i}>
                <Skeleton h={"100%"} />
            </Carousel.Slide>,
        );
    }

    return skeletons;
};

const TrendingReviewCarousel = () => {
    const onMobile = useOnMobile();
    const trendingReviews = useTrendingItems({
        limit: 10,
        minimumItems: 5,
        sourceType: "review",
        offset: 0,
    });
    const isEmpty =
        trendingReviews.isError || trendingReviews.data?.data.length === 0;

    const buildSlides = () => {
        if (trendingReviews.isLoading) {
            return buildSkeletons();
        }

        return trendingReviews.data?.data?.map((reviewStatistics) => {
            return (
                <Carousel.Slide key={reviewStatistics.id}>
                    <ReviewCard reviewId={reviewStatistics.sourceId} />
                </Carousel.Slide>
            );
        });
    };

    return (
        !isEmpty && (
            <DetailsBox
                title={"Trending Reviews"}
                content={
                    <Carousel
                        slideSize={{
                            base: "90%",
                            sm: "40%",
                        }}
                        height={440}
                        align="start"
                        slideGap={{
                            base: "xs",
                            lg: "md",
                        }}
                        slidesToScroll={onMobile ? 1 : 2}
                        controlsOffset="xs"
                        dragFree
                    >
                        {buildSlides()}
                    </Carousel>
                }
            />
        )
    );
};

export default TrendingReviewCarousel;
