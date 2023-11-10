import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { ApiError, LibrariesService, Library } from "@/wrapper/server";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export function useUserLibrary(
    userId: string | undefined,
): ExtendedUseQueryResult<Library | undefined> {
    const queryClient = useQueryClient();
    const queryKey = ["library", userId];
    const invalidate = () => queryClient.invalidateQueries(queryKey);

    return {
        ...useQuery({
            queryKey: queryKey,
            queryFn: async (): Promise<Library | undefined> => {
                if (!userId) return undefined;
                return LibrariesService.librariesControllerFindOneByIdWithPermissions(
                    userId,
                    /**
                     * Do not load collection's entries here, use useCollectionEntries or useCollection.ts instead.
                     */
                    {
                        relations: {
                            collections: true,
                        },
                    },
                );
            },
            enabled: !!userId,
        }),
        queryKey,
        invalidate,
    };
}
