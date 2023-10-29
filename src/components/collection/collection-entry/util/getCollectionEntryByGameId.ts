import {
    CollectionEntry,
    CollectionsEntriesService,
    GetCollectionEntryDto,
} from "@/wrapper";

/**
 * Returns a list CollectionEntry entity, given any is available in the user's library.
 * @param gameId
 * @param dto
 */
export async function getCollectionEntryByGameId(
    gameId: number,
    dto: GetCollectionEntryDto,
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
