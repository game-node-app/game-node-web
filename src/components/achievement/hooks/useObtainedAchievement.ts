import { useQuery } from "@tanstack/react-query";
import { AchievementsService } from "@/wrapper/server/services/AchievementsService";

export function useObtainedAchievement(
    targetUserId: string,
    achievementId: string,
) {
    return useQuery({
        queryKey: ["obtained-achievement", targetUserId, achievementId],
        queryFn: () => {
            return AchievementsService.achievementsControllerGetObtainedAchievement(
                targetUserId,
                achievementId,
            );
        },
        retry: false,
    });
}
