import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiError, GameRepositoryService } from "@/wrapper/server";

export function useGamesResource<T>(
    resourceName: string,
): UseQueryResult<T[], ApiError> {
    return useQuery({
        queryKey: ["game", "resource", resourceName],
        queryFn: () => {
            return GameRepositoryService.gameRepositoryControllerGetResource(
                resourceName,
            );
        },
        // Resources are constant
        staleTime: Infinity,
    });
}
