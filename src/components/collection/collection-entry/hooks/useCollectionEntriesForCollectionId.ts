import { useQuery, useQueryClient } from "react-query";
import {
    CollectionEntriesPaginatedResponseDto,
    CollectionEntry,
    Game,
    GameRepositoryFindAllDto,
    GameRepositoryService,
} from "@/wrapper/server";
import { getCollectionEntriesByCollectionId } from "@/components/collection/collection-entry/util/getCollectionEntriesByCollectionId";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

interface UseCollectionEntriesForCollectionIdProps {
    collectionId: string;
    limit?: number;
    offset?: number;
    gameRelations?: Record<string, object | boolean>;
}

/**
 * Returns a list of collection entries for the current user based on a collection id.
 * Automatically aggregates games.
 * @param collectionId
 * @param limit
 * @param offset
 * @param gameRelations
 */
export function useCollectionEntriesForCollectionId({
    collectionId,
    limit,
    offset,
    gameRelations,
}: UseCollectionEntriesForCollectionIdProps): ExtendedUseQueryResult<
    CollectionEntriesPaginatedResponseDto | undefined
> {
    const queryClient = useQueryClient();
    const queryKey = [
        "collection-entries",
        collectionId,
        offset,
        limit,
        gameRelations,
    ];
    const invalidate = () => {
        return queryClient.invalidateQueries([queryKey[0]]);
    };
    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                if (!collectionId) {
                    return undefined;
                }
                const collectionEntriesQuery =
                    await getCollectionEntriesByCollectionId(
                        collectionId,
                        offset,
                        limit,
                    );

                if (
                    collectionEntriesQuery &&
                    collectionEntriesQuery.data &&
                    collectionEntriesQuery.data.length > 0
                ) {
                    const gameIds = collectionEntriesQuery.data.map(
                        (entry) => entry.gameId,
                    );

                    const gamesQuery =
                        await GameRepositoryService.gameRepositoryControllerFindAllByIds(
                            {
                                gameIds: gameIds,
                                limit,
                                relations: gameRelations,
                            },
                        );
                    collectionEntriesQuery.data =
                        collectionEntriesQuery.data.map((entry) => {
                            // Associates game with current entry
                            entry.game = gamesQuery.data.find(
                                (game) => game.id === entry.gameId,
                            )!;
                            return entry;
                        });
                }
                return collectionEntriesQuery;
            },
            enabled: !!collectionId,
            keepPreviousData: true,
        }),
        queryKey,
        invalidate,
    };
}
