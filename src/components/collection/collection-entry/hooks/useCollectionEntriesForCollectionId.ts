import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    CollectionEntriesPaginatedResponseDto,
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
        return queryClient.invalidateQueries({ queryKey: [queryKey[0]] });
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

                    const gamesRequest =
                        await GameRepositoryService.gameRepositoryControllerFindAllByIds(
                            {
                                gameIds: gameIds,
                                relations: gameRelations,
                            },
                        );
                    collectionEntriesQuery.data =
                        collectionEntriesQuery.data.map((entry) => {
                            // Associates game with current entry
                            entry.game = gamesRequest.find(
                                (game) => game.id === entry.gameId,
                            )!;
                            return entry;
                        });
                }
                return collectionEntriesQuery;
            },
            enabled: !!collectionId,
            placeholderData: keepPreviousData,
        }),
        queryKey,
        invalidate,
    };
}
