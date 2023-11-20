import React from "react";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import { Review, ReviewsService } from "@/wrapper/server";
import { useQuery, useQueryClient } from "react-query";

const UseReviewForUserIdAndGameId = (
    userId: string | undefined,
    gameId: number,
): ExtendedUseQueryResult<Review> => {
    const queryClient = useQueryClient();
    const queryKey = ["review", userId, gameId];
    const invalidate = () => queryClient.invalidateQueries(queryKey);
    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                if (!userId || !gameId) return undefined;
                try {
                    const review =
                        await ReviewsService.reviewsControllerFindOneByUserIdAndGameId(
                            userId,
                            gameId,
                        );
                    // No idea why this happens.
                    if (typeof review === "string") {
                        return undefined;
                    }
                    return review;
                } catch (e) {
                    return undefined;
                }
            },
            retry: false,
            retryOnMount: false,
        }),
        invalidate,
        queryKey,
    };
};

export default UseReviewForUserIdAndGameId;
