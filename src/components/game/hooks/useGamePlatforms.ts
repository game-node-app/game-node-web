import { useQuery } from "react-query";
import { GameRepositoryService } from "@/wrapper/server";

export default function useGamePlatforms() {
    return useQuery({
        queryKey: ["game", "platforms"],
        queryFn: () => {
            return GameRepositoryService.gameRepositoryControllerFindAllPlatforms();
        },
        staleTime: Infinity,
        cacheTime: Infinity,
    });
}
