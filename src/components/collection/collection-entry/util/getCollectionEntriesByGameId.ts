import { CollectionEntry, CollectionsEntriesService } from "@/wrapper/server";

/**
 * Returns a list CollectionEntry entity, given any is available in the user's library.
 * @param gameId
 */
export async function getCollectionEntriesByGameId(
    gameId: number,
): Promise<CollectionEntry[] | undefined> {
    try {
        return await CollectionsEntriesService.collectionsEntriesControllerFindOwnEntryByGameId(
            gameId,
        );
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
