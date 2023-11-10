import { useQuery } from "react-query";
import { CollectionEntry } from "@/wrapper/server";
import { getCollectionEntriesByGameId } from "@/components/collection/collection-entry/util/getCollectionEntriesByGameId";

/**
 * Returns a collection entry for the current user based on a game ID.
 * The collection entry will be undefined if the user doesn't have the game in their library.
 * @param gameId
 */
export function useCollectionEntriesForGameId(gameId: number) {
    return useQuery<CollectionEntry[] | undefined>({
        queryKey: ["collectionEntries", gameId],
        queryFn: async (): Promise<CollectionEntry[] | undefined> => {
            if (!gameId) {
                return undefined;
            }
            return await getCollectionEntriesByGameId(gameId, {
                relations: {
                    collection: true,
                    ownedPlatforms: true,
                },
            });
        },
        staleTime: 60 * 1000,
    });
}
