import {
    CollectionEntriesPaginatedResponseDto,
    CollectionsEntriesService,
} from "@/wrapper/server";

/**
 * Returns a list CollectionEntry entity, given any is available in the user's library.
 * @param collectionId
 * @param offset
 * @param limit
 */
export async function getCollectionEntriesByCollectionId(
    collectionId: string,
    offset?: number,
    limit?: number,
): Promise<CollectionEntriesPaginatedResponseDto | undefined> {
    try {
        return await CollectionsEntriesService.collectionsEntriesControllerFindAllByCollectionId(
            collectionId,
            offset,
            limit,
        );
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
