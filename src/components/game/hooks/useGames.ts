import {
    Game,
    GameRepositoryFindAllDto,
    GameRepositoryPaginatedResponseDto,
    GameRepositoryService,
} from "@/wrapper/server";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export function useGames(
    dto: GameRepositoryFindAllDto,
): ExtendedUseQueryResult<GameRepositoryPaginatedResponseDto> {
    const queryClient = useQueryClient();
    const queryKey = ["game", "all", dto];
    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: [queryKey[0], queryKey[1]] });

    return {
        ...useQuery({
            queryKey: queryKey,
            queryFn: () => {
                if (dto == undefined || dto.gameIds.length === 0) {
                    return null;
                }

                return GameRepositoryService.gameRepositoryControllerFindAllByIds(
                    dto,
                );
            },
            enabled: dto.gameIds && dto.gameIds.length > 0,
        }),
        queryKey,
        invalidate,
    };
}
