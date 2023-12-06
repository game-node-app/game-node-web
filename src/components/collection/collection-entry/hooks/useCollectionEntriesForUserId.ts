import { useQuery } from "@tanstack/react-query";
import {
    CollectionsEntriesService,
    CollectionsService,
} from "@/wrapper/server";

export default function useCollectionEntriesForUserId(userId: string) {
    return useQuery({
        queryKey: ["collection-entries", "all", userId],
        queryFn: async () => {
            return CollectionsEntriesService.collectionsEntriesControllerFindAllByLibraryId(
                userId,
                0,
                100,
            );
        },
        staleTime: 5 * 60 * 1000,
    });
}
