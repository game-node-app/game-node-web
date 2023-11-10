import {
    CollectionEntry,
    CollectionsEntriesService,
    GetCollectionEntriesDto,
} from "@/wrapper/server";
import { TPaginationResponse } from "@/util/types/pagination";

/**
 * Returns a list CollectionEntry entity, given any is available in the user's library.
 * @param collectionId
 * @param dto
 */
export async function getCollectionEntriesByCollectionId(
    collectionId: string,
    dto: GetCollectionEntriesDto,
): Promise<TPaginationResponse<CollectionEntry> | undefined> {
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
