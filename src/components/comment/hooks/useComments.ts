import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import {
    CommentService,
    FindCommentsPaginatedResponseDto,
} from "@/wrapper/server";

export interface UseCommentsProps {
    enabled: boolean;
    sourceId: string;
    sourceType: "review";
    offset?: number;
    limit?: number;
}

export function useComments({
    enabled,
    sourceId,
    sourceType,
    offset = 0,
    limit = 10,
}: UseCommentsProps): ExtendedUseQueryResult<FindCommentsPaginatedResponseDto> {
    const queryClient = useQueryClient();
    const queryKey = ["comments", sourceType, sourceId, offset, limit];

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: queryKey.slice(0, 2),
        });
    };
    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                return CommentService.commentControllerFindAll(
                    sourceId,
                    sourceType,
                    offset,
                    limit,
                );
            },
            enabled,
        }),
        queryKey,
        invalidate,
    };
}
