import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import { Collection, CollectionsService } from "@/wrapper";
import { useQuery, useQueryClient } from "react-query";

export function useCollection(
    collectionId: string,
): ExtendedUseQueryResult<Collection> {
    const queryClient = useQueryClient();
    const queryKey = ["collection", collectionId];
    const invalidate = () => queryClient.invalidateQueries(queryKey);
    return {
        ...useQuery({
            queryKey: queryKey,
            queryFn: () => {
                if (collectionId == undefined) {
                    return undefined;
                }

                return CollectionsService.collectionsControllerFindOneByIdWithPermissions(
                    collectionId,
                );
            },
        }),
        invalidate,
        queryKey,
    };
}
