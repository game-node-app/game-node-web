import { useQuery, useQueryClient } from "react-query";
import {
    CollectionEntriesPaginatedResponseDto,
    CollectionEntry,
    GetCollectionEntriesDto,
} from "@/wrapper/server";
import { getCollectionEntriesByGameId } from "@/components/collection/collection-entry/util/getCollectionEntriesByGameId";
import { getCollectionEntriesByCollectionId } from "@/components/collection/collection-entry/util/getCollectionEntriesByCollectionId";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

/**
 * Returns a collection entry for the current user based on a game ID.
 * The collection entry will be undefined if the user doesn't have the game in their library.
 * @param collectionId
 * @param dto
 */
export function useCollectionEntriesForCollectionId(
    collectionId: string,
    dto: GetCollectionEntriesDto,
): ExtendedUseQueryResult<CollectionEntriesPaginatedResponseDto | undefined> {
    const queryClient = useQueryClient();
    const queryKey = ["collection-entries", collectionId, dto];
    const invalidate = () => {
        return queryClient.invalidateQueries([queryKey[0]]);
    };
    return {
        ...useQuery({
            queryKey,
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
            enabled: !!collectionId,
        }),
        queryKey,
        invalidate,
    };
}
