import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiError, Game, GameRepositoryService } from "@/wrapper/server";

export function useGamesResource<T, U extends keyof Game = any>(
    resourceName: U,
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
