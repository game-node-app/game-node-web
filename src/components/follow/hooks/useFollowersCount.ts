import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FollowService } from "@/wrapper/server";

export function useFollowersCount(
    targetUserId: string | undefined,
): ExtendedUseQueryResult<number> {
    const queryClient = useQueryClient();
    const queryKey = ["follow", "count", targetUserId];
    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey: queryKey.slice(0, 1),
        });
    };

    return {
        queryKey,
        invalidate,
        ...useQuery({
            queryKey,
            queryFn: () => {
                try {
                    if (!targetUserId) return 0;
                    return FollowService.followControllerGetFollowersCount(
                        targetUserId,
                    );
                } catch (e) {
                    console.error(e);
                    return 0;
                }
            },
        }),
    };
}
