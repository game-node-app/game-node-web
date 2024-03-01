import React from "react";
import { useReviewsScore } from "@/components/review/hooks/useReviewsScore";
import CenteredLoading from "@/components/general/CenteredLoading";
import { DetailsBox } from "@/components/general/DetailsBox";
import { Center, Rating } from "@mantine/core";

interface Props {
    gameId: number;
}

const GameInfoScore = ({ gameId }: Props) => {
    const score = useReviewsScore(gameId);

    return (
        <DetailsBox
            withBorder
            withDimmedTitle
            title={"Rating"}
            enabled={score.isSuccess && score.data != undefined}
        >
            <Center>
                <Rating value={score.data?.median} />
            </Center>
        </DetailsBox>
    );
};

export default GameInfoScore;
