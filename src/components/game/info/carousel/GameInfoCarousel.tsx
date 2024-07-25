import React from "react";
import { Carousel } from "@mantine/carousel";
import { Game } from "@/wrapper/server";
import GameGridItem from "@/components/game/figure/GameGridItem";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { Flex, Skeleton, Text } from "@mantine/core";

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
                    <GameGridItem game={similarGame} withQuickAdd={false} />
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
                <Skeleton height={250} />
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
            slideSize={{
                base: "65%",
                lg: "15%",
            }}
            height={"fit-content"}
            align="start"
            slideGap={{
                base: "xs",
                lg: "md",
            }}
            controlsOffset="xs"
            dragFree
        >
            {isLoading ? buildSkeletons() : buildGamesFigures(games)}
        </Carousel>
    );
};

export default GameInfoCarousel;
