import { useQuery } from "@tanstack/react-query";
import { CollectionsEntriesService } from "@/wrapper/server";

export function useFavoriteCollectionEntries(
    userId: string,
    offset: number,
    limit: number,
) {
    return useQuery({
        queryKey: ["collection-entries", "favorites", offset, limit],
        queryFn: () => {
            return CollectionsEntriesService.collectionsEntriesControllerGetFavorites(
                userId,
                offset,
                limit,
            );
        },
    });
}
