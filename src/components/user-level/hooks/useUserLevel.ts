import { useQuery } from "@tanstack/react-query";
import { UserLevelService } from "@/wrapper/server";

export function useUserLevel(targetUserId: string) {
    return useQuery({
        queryKey: ["user-level", targetUserId],
        queryFn: () => {
            return UserLevelService.userLevelControllerFindOne(targetUserId);
        },
        enabled: targetUserId != undefined,
    });
}
