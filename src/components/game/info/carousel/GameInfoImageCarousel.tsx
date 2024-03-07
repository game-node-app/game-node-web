import React, { useMemo } from "react";
import { Carousel, CarouselProps } from "@mantine/carousel";
import { CarouselSlideProps } from "@mantine/carousel/lib/CarouselSlide/CarouselSlide";
import { Flex, Text } from "@mantine/core";
import {
    getSizedImageUrl,
    ImageSize,
} from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import GameInfoImageCarouselSlide from "@/components/game/info/carousel/GameInfoImageCarouselSlide";
import { useGame } from "@/components/game/hooks/useGame";
import { Game } from "@/wrapper/server";
import { DetailsBox } from "@/components/general/DetailsBox";

interface IGameInfoImageCarouselProps {
    gameId: number | undefined;
    imageSize: ImageSize;
    carouselProps?: CarouselProps;
    slideProps?: CarouselSlideProps;
}

const getCombinedImages = (game: Game) => {
    const screenshotsUrls = game.screenshots
        ?.filter((screenshot) => screenshot.url != undefined)
        .map((screenshot) => screenshot.url!);

    const artworksUrls = game.artworks
        ?.filter((screenshot) => screenshot.url != undefined)
        .map((screenshot) => screenshot.url!);

    const combinedImagesUrls = [
        ...(screenshotsUrls ?? []),
        ...(artworksUrls ?? []),
    ];

    return combinedImagesUrls;
};

const GameInfoImageCarousel = ({
    gameId,
    carouselProps,
    imageSize,
    slideProps,
}: IGameInfoImageCarouselProps) => {
    const onMobile = useOnMobile();
    const gameQuery = useGame(gameId, {
        relations: {
            artworks: true,
            screenshots: true,
        },
    });

    const game = gameQuery.data;

    const combinedImages = useMemo(() => {
        if (game != undefined) {
            return getCombinedImages(game);
        }
    }, [game]);

    const hasImages = combinedImages && combinedImages.length > 0;

    if (!combinedImages) {
        return null;
    }

    if (combinedImages == undefined || combinedImages.length === 0) {
        return (
            <Flex>
                <Text>No images found.</Text>
            </Flex>
        );
    }

    const buildSlides = () => {
        return combinedImages.map((url, index) => {
            const urlToUse = getSizedImageUrl(url, imageSize);
            if (!urlToUse) return null;
            return (
                <GameInfoImageCarouselSlide imageSrc={urlToUse} key={index} />
            );
        });
    };

    return (
        <Flex w={"100%"} wrap={"wrap"}>
            <DetailsBox title={"Images"} enabled={hasImages}>
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
            </DetailsBox>
        </Flex>
    );
};

export default GameInfoImageCarousel;
