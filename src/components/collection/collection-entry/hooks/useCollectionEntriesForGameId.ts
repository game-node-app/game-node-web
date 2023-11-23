import { useQuery, useQueryClient } from "react-query";
import { CollectionEntry } from "@/wrapper/server";
import { getCollectionEntriesByGameId } from "@/components/collection/collection-entry/util/getCollectionEntriesByGameId";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

/**
 * Returns a collection entry for the current user based on a game ID.
 * The collection entry will be undefined if the user doesn't have the game in their library.
 * @param gameId
 */
export function useCollectionEntriesForGameId(
    gameId: number,
): ExtendedUseQueryResult<CollectionEntry[] | undefined> {
    const queryClient = useQueryClient();
    const queryKey = ["collection-entries", "own", gameId];
    const invalidate = () => {
        queryClient.invalidateQueries([queryKey[0]]);
    };
    return {
        ...useQuery({
            queryKey,
            queryFn: async () => {
                if (!gameId) {
                    return undefined;
                }
                return await getCollectionEntriesByGameId(gameId);
            },
        }),
        queryKey,
        invalidate,
    };
}
