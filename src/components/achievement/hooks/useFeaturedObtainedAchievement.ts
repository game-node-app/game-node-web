import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AchievementsService, ObtainedAchievement } from "@/wrapper/server";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import { useAllObtainedAchievements } from "@/components/achievement/hooks/useAllObtainedAchievements";

export function useFeaturedObtainedAchievement(
    userId: string | undefined,
): ExtendedUseQueryResult<ObtainedAchievement | undefined> {
    const queryClient = useQueryClient();
    const queryKey = ["achievements", "featured", userId];

    const obtainedAchievements = useAllObtainedAchievements(userId);

    const invalidate = () => {
        queryClient.invalidateQueries({
            queryKey,
        });
        obtainedAchievements.invalidate();
    };

    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                const featuredAchievement = obtainedAchievements.data?.find(
                    (achievement) => achievement.isFeatured,
                );
                if (!featuredAchievement) return null;

                return featuredAchievement;
            },
        }),
        invalidate,
        queryKey,
    };
}
