import { useQuery } from "@tanstack/react-query";
import { CollectionsEntriesService } from "@/wrapper/server";

export default function useCollectionEntriesForUserId(
    userId: string,
    offset = 0,
    limit = 20,
) {
    return useQuery({
        queryKey: ["collection-entries", "all", userId, offset, limit],
        queryFn: async () => {
            return CollectionsEntriesService.collectionsEntriesControllerFindAllByLibraryId(
                userId,
                offset,
                limit,
            );
        },
    });
}
