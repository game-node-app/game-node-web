import { useMutation } from "@tanstack/react-query";
import { StatisticsActionDto, StatisticsQueueService } from "@/wrapper/server";
import { useItemStatistics } from "@/components/statistics/hooks/useItemStatistics";
import { StatisticsSourceType } from "@/components/statistics/statistics-types";
import { useRef } from "react";

export function useUserView(
    sourceId: string | number,
    sourceType: StatisticsSourceType,
) {
    const statisticsQuery = useItemStatistics(`${sourceId}`, sourceType);
    const viewsCount = statisticsQuery.data?.viewsCount || 0;
    const isViewed = statisticsQuery.data?.isViewed || false;
    /**
     * Avoids duplicate requests between re-renders.
     */
    const lastRegisteredViewSourceId = useRef<string | undefined>(undefined);
    const viewMutation = useMutation({
        mutationFn: async () => {
            if (
                lastRegisteredViewSourceId.current &&
                lastRegisteredViewSourceId.current === sourceId
            ) {
                return;
            }
            await StatisticsQueueService.statisticsQueueControllerAddView({
                sourceId: `${sourceId}`,
                sourceType: sourceType as StatisticsActionDto.sourceType,
            });

            lastRegisteredViewSourceId.current = `${sourceId}`;
        },
    });

    const incrementView = () => {
        viewMutation.mutate();
    };

    return [viewsCount, isViewed, incrementView] as const;
}
