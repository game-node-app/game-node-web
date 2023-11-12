import React, { useMemo, useState } from "react";
import useReviewsForGameId from "@/components/review/hooks/useReviewsForGameId";

interface IReviewListViewProps {
    gameId: number;
}

const ReviewListView = ({ gameId }: IReviewListViewProps) => {
    const reviewsQuery = useReviewsForGameId(gameId);

    return <div></div>;
};

export default ReviewListView;
