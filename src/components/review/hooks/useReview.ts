import { useQuery } from "@tanstack/react-query";
import { ReviewsService } from "@/wrapper/server";

export function useReview(reviewId: string) {
    return useQuery({
        queryKey: ["review", reviewId],
        queryFn: () => {
            return ReviewsService.reviewsControllerFindOneById(reviewId);
        },
    });
}
