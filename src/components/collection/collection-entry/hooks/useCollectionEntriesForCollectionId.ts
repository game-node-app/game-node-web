import { useQuery } from "react-query";
import {
    CollectionEntriesPaginatedResponseDto,
    CollectionEntry,
    GetCollectionEntriesDto,
} from "@/wrapper/server";
import { getCollectionEntriesByGameId } from "@/components/collection/collection-entry/util/getCollectionEntriesByGameId";
import { getCollectionEntriesByCollectionId } from "@/components/collection/collection-entry/util/getCollectionEntriesByCollectionId";

/**
 * Returns a collection entry for the current user based on a game ID.
 * The collection entry will be undefined if the user doesn't have the game in their library.
 * @param collectionId
 * @param dto
 */
export function useCollectionEntriesForCollectionId(
    collectionId: string,
    dto: GetCollectionEntriesDto,
) {
    return useQuery<CollectionEntriesPaginatedResponseDto | undefined>({
        queryKey: ["collectionEntries", collectionId, dto],
        queryFn: async () => {
            if (!collectionId) {
                return undefined;
            }
            return await getCollectionEntriesByCollectionId(
                collectionId,
                dto ?? {
                    relations: {
                        game: {
                            cover: true,
                        },
                    },
                },
            );
        },
        staleTime: 60 * 1000,
        enabled: !!collectionId,
    });
}
