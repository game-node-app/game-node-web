import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import {
    FindReviewPaginatedDto,
    Review,
    ReviewsService,
} from "@/wrapper/server";
import { useQuery, useQueryClient } from "react-query";

export default function useReviewsForGameId(
    gameId: number,
): ExtendedUseQueryResult<FindReviewPaginatedDto> {
    const queryClient = useQueryClient();
    const queryKey = ["review", gameId];
    const invalidate = () => queryClient.invalidateQueries(queryKey);

    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                if (gameId == undefined) return undefined;
                return await ReviewsService.reviewsControllerFindAllByGameId(
                    gameId,
                );
            },
        }),
        queryKey,
        invalidate,
    };
}
