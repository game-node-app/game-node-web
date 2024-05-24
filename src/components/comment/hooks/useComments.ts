import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import {
    CommentService,
    FindAllCommentsDto,
    FindCommentsPaginatedResponseDto,
} from "@/wrapper/server";

export interface UseCommentsProps extends FindAllCommentsDto {
    enabled: boolean;
    offset?: number;
    limit?: number;
}

export function useComments({
    enabled,
    sourceId,
    sourceType,
    offset = 0,
    limit = 10,
    orderBy,
}: UseCommentsProps): ExtendedUseQueryResult<FindCommentsPaginatedResponseDto> {
    const queryClient = useQueryClient();
    const queryKey = ["comments", sourceType, sourceId, offset, limit, orderBy];

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: queryKey.slice(0, 2),
        });
    };
    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                return CommentService.commentControllerFindAll({
                    sourceId,
                    sourceType,
                    orderBy,
                    limit,
                    offset,
                });
            },
            enabled,
            retry: 1,
        }),
        queryKey,
        invalidate,
    };
}
