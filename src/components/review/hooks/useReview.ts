import { useQuery } from "@tanstack/react-query";
import { ReviewsService } from "@/wrapper/server";

export function useReview(reviewId: string | undefined) {
    return useQuery({
        queryKey: ["review", reviewId],
        queryFn: () => {
            if (!reviewId) {
                return null;
            }
            return ReviewsService.reviewsControllerFindOneById(reviewId);
        },
        enabled: reviewId != undefined,
    });
}
