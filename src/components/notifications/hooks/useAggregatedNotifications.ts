import useUserId from "@/components/auth/hooks/useUserId";
import { useQuery } from "@tanstack/react-query";
import { NotificationsService } from "@/wrapper/server";

export function useAggregatedNotifications(offset = 0) {
    const userId = useUserId();
    return useQuery({
        queryKey: ["notifications", "aggregated", userId],
        queryFn: () => {
            return NotificationsService.notificationsControllerFindAllAndAggregate(
                offset,
            );
        },
        enabled: !!userId,
    });
}
