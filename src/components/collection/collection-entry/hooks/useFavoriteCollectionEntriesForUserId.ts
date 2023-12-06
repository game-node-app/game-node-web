import { useQuery } from "@tanstack/react-query";
import { CollectionsEntriesService } from "@/wrapper/server";

export function useFavoriteCollectionEntriesForUserId(
    userId: string,
    offset?: number,
    limit?: number,
) {
    return useQuery({
        queryKey: ["collection-entries", "favorites", userId],
        queryFn: () => {
            return CollectionsEntriesService.collectionsEntriesControllerFindFavoritesByLibraryId(
                userId,
                offset,
                limit,
            );
        },
    });
}
