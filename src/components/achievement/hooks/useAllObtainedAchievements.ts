import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
    AchievementDto,
    AchievementsService,
    ObtainedAchievement,
} from "@/wrapper/server";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export function useAllObtainedAchievements(
    targetUserId: string | undefined,
): ExtendedUseQueryResult<ObtainedAchievement[] | null> {
    const queryClient = useQueryClient();
    const queryKey = ["obtained-achievement", "all", targetUserId];
    const invalidate = () => queryClient.invalidateQueries({ queryKey });
    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                if (!targetUserId) {
                    return null;
                }
                const achievements =
                    await AchievementsService.achievementsControllerGetAllObtainedAchievements(
                        targetUserId,
                    );
                if (achievements == undefined || achievements.length === 0) {
                    return null;
                }

                return achievements;
            },
            enabled: !!targetUserId,
        }),
        invalidate,
        queryKey,
    };
}
