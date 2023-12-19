import { useQuery } from "@tanstack/react-query";
import {
    CancelablePromise,
    GamePlatform,
    GameRepositoryService,
} from "@/wrapper/server";

export default function useGamePlatforms() {
    return useQuery({
        queryKey: ["game", "platforms"],
        queryFn: () => {
            return GameRepositoryService.gameRepositoryControllerGetResource(
                "platform",
            ) as unknown as Promise<GamePlatform[]>;
        },
        staleTime: Infinity,
    });
}
