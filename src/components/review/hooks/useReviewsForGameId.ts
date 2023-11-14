import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import {
    FindReviewDto,
    FindReviewPaginatedDto,
    Review,
    ReviewsService,
} from "@/wrapper/server";
import { useQuery, useQueryClient } from "react-query";

export default function useReviewsForGameId(
    gameId: number,
    dto?: FindReviewDto,
): ExtendedUseQueryResult<FindReviewPaginatedDto> {
    const queryClient = useQueryClient();
    const queryKey = ["review", gameId, dto];
    const invalidate = () => queryClient.invalidateQueries(queryKey);

    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                if (gameId == undefined) return undefined;
                return await ReviewsService.reviewsControllerFindAllByGameId(
                    gameId,
                    dto ?? {},
                );
            },
        }),
        queryKey,
        invalidate,
    };
}
