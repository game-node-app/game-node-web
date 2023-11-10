import {
    CollectionEntry,
    CollectionsEntriesService,
    GetCollectionEntriesDto,
} from "@/wrapper/server";

/**
 * Returns a list CollectionEntry entity, given any is available in the user's library.
 * @param gameId
 * @param dto
 */
export async function getCollectionEntriesByGameId(
    gameId: number,
    dto: GetCollectionEntriesDto,
): Promise<CollectionEntry[] | undefined> {
    try {
        return await CollectionsEntriesService.collectionsEntriesControllerFindOwnEntryByGameId(
            gameId,
            dto,
        );
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
