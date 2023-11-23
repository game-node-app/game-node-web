import React from "react";
import { Carousel } from "@mantine/carousel";
import { Game } from "@/wrapper/server";
import GameGridFigure from "@/components/game/figure/GameGridFigure";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import useOnMobile from "@/hooks/useOnMobile";
import { Center, Flex, Skeleton, Text } from "@mantine/core";

interface IGameInfoCarouselProps {
    isLoading: boolean;
    isError: boolean;
    games: Game[] | undefined;
}

const buildGamesFigures = (games: Game[] | undefined) => {
    if (games == undefined || games.length === 0) return null;

    return games.map((similarGame, index) => {
        if (index < 20) {
            return (
                <Carousel.Slide key={similarGame.id}>
                    <GameGridFigure
                        game={similarGame}
                        figureProps={{ size: ImageSize.COVER_BIG }}
                    />
                </Carousel.Slide>
            );
        }
        return null;
    });
};

const buildSkeletons = () => {
    const skeletons = [];
    for (let i = 0; i < 7; i++) {
        skeletons.push(
            <Carousel.Slide key={i}>
                <Skeleton height={300} />
            </Carousel.Slide>,
        );
    }

    return skeletons;
};

const buildErrorView = () => {
    return (
        <Flex>
            <Text>No entry found.</Text>
        </Flex>
    );
};

const GameInfoCarousel = ({
    games,
    isLoading,
    isError,
}: IGameInfoCarouselProps) => {
    const onMobile = useOnMobile();
    if (isError) {
        return buildErrorView();
    }

    if ((!isLoading && games == undefined) || games?.length === 0) {
        return buildErrorView();
    }

    return (
        <Carousel
            slideSize={onMobile ? "80%" : "15%"}
            height={300}
            align="start"
            slideGap="xs"
            controlsOffset="xs"
            dragFree
        >
            {isLoading ? buildSkeletons() : buildGamesFigures(games)}
        </Carousel>
    );
};

export default GameInfoCarousel;
