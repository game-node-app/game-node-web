import { useQuery } from "react-query";
import { CollectionEntry } from "@/wrapper";
import { getCollectionEntryByGameId } from "@/components/collection/collection-entry/util/getCollectionEntryByGameId";

/**
 * Returns a collection entry for the current user based on a game ID.
 * The collection entry will be undefined if the user doesn't have the game in their library.
 * @param gameId
 */
export function useCollectionEntries(gameId: number) {
    return useQuery<CollectionEntry[] | undefined>({
        queryKey: ["collectionEntries", gameId],
        queryFn: async (): Promise<CollectionEntry[] | undefined> => {
            if (!gameId) {
                return undefined;
            }
            return await getCollectionEntryByGameId(gameId, {
                relations: {
                    collection: true,
                    ownedPlatforms: true,
                },
            });
        },
        staleTime: 60 * 1000,
    });
}
