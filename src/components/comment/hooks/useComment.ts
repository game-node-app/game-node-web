import { CommentService, FindAllCommentsDto } from "@/wrapper/server";
import sourceType = FindAllCommentsDto.sourceType;
import { useQuery } from "@tanstack/react-query";

/**
 * Retrieves a single comment based on criteria.
 * Will only be enabled if commentId is not null.
 */
export function useComment(
    commentId: string | undefined,
    sourceType: sourceType,
) {
    return useQuery({
        queryKey: ["comment", "findOne", sourceType, commentId],
        queryFn: async () => {
            if (!commentId) {
                return null;
            }

            return CommentService.commentControllerFindOneByIdV1(
                sourceType.valueOf(),
                commentId,
            );
        },
        enabled: commentId != undefined,
        retry: 1,
        staleTime: Infinity,
    });
}
