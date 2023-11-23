import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import { Collection, CollectionsService } from "@/wrapper/server";
import { useQuery, useQueryClient } from "react-query";

export function useCollection(
    collectionId: string | undefined,
): ExtendedUseQueryResult<Collection> {
    const queryClient = useQueryClient();
    const queryKey = ["collection", collectionId];
    const invalidate = () =>
        queryClient.invalidateQueries([queryKey[0], queryKey[1]]);
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
