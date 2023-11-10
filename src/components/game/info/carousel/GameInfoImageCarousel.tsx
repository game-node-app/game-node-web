import "@mantine/carousel/styles.css";
import React from "react";
import { Carousel, CarouselProps } from "@mantine/carousel";
import { Game } from "@/wrapper/server";
import { CarouselSlideProps } from "@mantine/carousel/lib/CarouselSlide/CarouselSlide";
import { Image } from "@mantine/core";
import {
    getSizedImageUrl,
    ImageSize,
} from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/hooks/useOnMobile";

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

    const buildSlides = () => {
        return urls.map((url, index) => {
            const urlToUse = getSizedImageUrl(url, imageSize);
            return (
                <Carousel.Slide {...slideProps} key={index}>
                    <Image src={urlToUse!} alt={"Game Image"} />
                </Carousel.Slide>
            );
        });
    };

    return (
        <Carousel
            slideSize={onMobile ? "100%" : "35%"}
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
