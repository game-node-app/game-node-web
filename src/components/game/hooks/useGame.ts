import { useQuery, UseQueryResult } from "react-query";
import {
    Game,
    GameRepositoryRequestDto,
    GameRepositoryService,
} from "@/wrapper/server";

export function useGame(
    id: number,
    dto: GameRepositoryRequestDto,
): UseQueryResult<Game | undefined> {
    return useQuery<Game | undefined>({
        queryKey: ["game", id, dto],
        queryFn: async (): Promise<Game | undefined> => {
            if (!id) {
                return undefined;
            }
            const game =
                await GameRepositoryService.gameRepositoryControllerFindOneById(
                    id,
                    dto,
                );

            return game;
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}
