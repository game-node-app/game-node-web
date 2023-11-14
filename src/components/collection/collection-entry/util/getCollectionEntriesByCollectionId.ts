import {
    CollectionEntriesPaginatedResponseDto,
    CollectionsEntriesService,
    GetCollectionEntriesDto,
    PaginationInfo,
} from "@/wrapper/server";

/**
 * Returns a list CollectionEntry entity, given any is available in the user's library.
 * @param collectionId
 * @param dto
 */
export async function getCollectionEntriesByCollectionId(
    collectionId: string,
    dto: GetCollectionEntriesDto,
): Promise<CollectionEntriesPaginatedResponseDto | undefined> {
    try {
        return await CollectionsEntriesService.collectionsEntriesControllerFindAllByCollectionId(
            collectionId,
            dto,
        );
    } catch (e) {
        console.error(e);
        return undefined;
    }
}
