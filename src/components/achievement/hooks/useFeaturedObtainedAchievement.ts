import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AchievementsService, ObtainedAchievement } from "@/wrapper/server";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export function useFeaturedObtainedAchievement(
    userId: string | undefined,
): ExtendedUseQueryResult<ObtainedAchievement | undefined> {
    const queryClient = useQueryClient();
    const queryKey = ["achievements", "featured", userId];

    const achievements = useAchievements({
        limit: 1000,
    });

    const invalidate = () =>
        queryClient.invalidateQueries({
            queryKey,
        });

    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                if (!userId) return undefined;
                if (!achievements.data) return undefined;

                let obtainedAchievements: ObtainedAchievement[] = [];

                for (const achievement of achievements.data.data) {
                    try {
                        const response =
                            await AchievementsService.achievementsControllerGetObtainedAchievement(
                                achievement.id,
                                userId!,
                            );
                        obtainedAchievements.push(response);
                    } catch (e) {}
                }

                return obtainedAchievements.find(
                    (achievement) => achievement.isFeatured,
                );
            },
            enabled: !!userId,
        }),
        invalidate,
        queryKey,
    };
}
