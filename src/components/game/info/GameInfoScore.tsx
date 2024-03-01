import React, { useMemo } from "react";
import { useReviewsScore } from "@/components/review/hooks/useReviewsScore";
import CenteredLoading from "@/components/general/CenteredLoading";
import { DetailsBox } from "@/components/general/DetailsBox";
import { Box, Center, Flex, Rating, Stack, Text, Tooltip } from "@mantine/core";

interface Props {
    gameId: number;
}

const GameInfoScore = ({ gameId }: Props) => {
    const score = useReviewsScore(gameId);
    const goodRatingPercentage = useMemo(() => {
        if (score.data == undefined) return undefined;
        const distribution = score.data.distribution;
        const ratingCount = distribution["4"] + distribution["5"];
        const percentageCeil = Math.ceil(ratingCount / distribution.total);
        return percentageCeil * 100;
    }, [score.data]);
    return (
        <DetailsBox
            withBorder
            withDimmedTitle
            title={"User Rating"}
            enabled={score.isSuccess && score.data != undefined}
        >
            <Center className={"mt-6 mb-6"}>
                <Tooltip
                    label={`${goodRatingPercentage}% of reviewers have considered this
                    game good or great.`}
                >
                    <Rating
                        value={score.data?.median}
                        fractions={2}
                        size={"lg"}
                        readOnly
                    />
                </Tooltip>
            </Center>
        </DetailsBox>
    );
};

export default GameInfoScore;
