import React from "react";
import { BackgroundImage, Paper, Stack } from "@mantine/core";
import { Review } from "@/wrapper/server";
import {
    getSizedImageUrl,
    ImageSize,
} from "@/components/game/util/getSizedImageUrl";

interface IProps {
    review: Review;
}

const ReviewCard = ({ review }: IProps) => {
    const game = review.game;
    const coverUrl = game.cover?.url;
    const url = getSizedImageUrl(coverUrl, ImageSize.COVER_BIG);
    return (
        <Paper shadow={"md"} radius={"md"} w={"100%"} h={"100%"}>
            <BackgroundImage src={url!}>
                <Stack w={"100%"}></Stack>
            </BackgroundImage>
        </Paper>
    );
};

export default ReviewCard;
