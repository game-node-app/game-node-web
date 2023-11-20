import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";
import {
    Collection,
    CollectionsService,
    GetCollectionDto,
} from "@/wrapper/server";
import { useQuery, useQueryClient } from "react-query";

export function useCollection(
    collectionId: string | undefined,
    dto: GetCollectionDto,
): ExtendedUseQueryResult<Collection> {
    const queryClient = useQueryClient();
    const queryKey = ["collection", collectionId, dto];
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
                    dto ?? {},
                );
            },
        }),
        invalidate,
        queryKey,
    };
}
