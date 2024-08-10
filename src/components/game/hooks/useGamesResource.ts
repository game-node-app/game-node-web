import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ApiError, Game, GameRepositoryService } from "@/wrapper/server";

export function useGamesResource<U extends keyof Game>(
    resourceName: U,
    enabled = true,
): UseQueryResult<Game[U], ApiError> {
    return useQuery({
        queryKey: ["game", "resource", resourceName],
        queryFn: () => {
            return GameRepositoryService.gameRepositoryControllerGetResource(
                resourceName,
            );
        },
        enabled,
        // Resources are constant
        staleTime: Infinity,
    });
}
