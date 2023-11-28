import { useQuery } from "@tanstack/react-query";
import { CollectionsService } from "@/wrapper/server";

export default function useCollectionEntriesForUserId(userId: string) {
    return useQuery({
        queryKey: ["collection", "entries", userId],
        queryFn: async () => {
            const collections =
                await CollectionsService.collectionsControllerFindAllByUserIdWithPermissions(
                    userId,
                );
            return collections.flatMap((collection) => collection.entries);
        },
        staleTime: 5 * 60 * 1000,
    });
}
