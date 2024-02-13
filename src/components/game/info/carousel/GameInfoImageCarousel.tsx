import React from "react";
import { Carousel, CarouselProps } from "@mantine/carousel";
import { CarouselSlideProps } from "@mantine/carousel/lib/CarouselSlide/CarouselSlide";
import { Flex, Text } from "@mantine/core";
import {
    getSizedImageUrl,
    ImageSize,
} from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import GameInfoImageCarouselSlide from "@/components/game/info/carousel/GameInfoImageCarouselSlide";

interface IGameInfoImageCarouselProps {
    urls: string[] | undefined;
    imageSize: ImageSize;
    carouselProps?: CarouselProps;
    slideProps?: CarouselSlideProps;
}

const GameInfoImageCarousel = ({
    urls,
    carouselProps,
    imageSize,
    slideProps,
}: IGameInfoImageCarouselProps) => {
    const onMobile = useOnMobile();
    if (!urls) {
        return null;
    }

    if (urls == undefined || urls.length === 0) {
        return (
            <Flex>
                <Text>No images found.</Text>
            </Flex>
        );
    }

    const buildSlides = () => {
        return urls.map((url, index) => {
            const urlToUse = getSizedImageUrl(url, imageSize);
            if (!urlToUse) return null;
            return (
                <GameInfoImageCarouselSlide imageSrc={urlToUse} key={index} />
            );
        });
    };

    return (
        <Carousel
            slideSize={{
                base: "100%",
                lg: "35%",
            }}
            height={"fit-content"}
            align="start"
            slideGap="xs"
            controlsOffset="xs"
            dragFree
            {...carouselProps}
        >
            {buildSlides()}
        </Carousel>
    );
};

export default GameInfoImageCarousel;
