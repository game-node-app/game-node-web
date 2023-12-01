import {
    useQuery,
    useQueryClient,
    UseQueryResult,
} from "@tanstack/react-query";
import { ApiError, LibrariesService, Library } from "@/wrapper/server";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export function useUserLibrary(
    userId: string | undefined,
): ExtendedUseQueryResult<Library | null> {
    const queryClient = useQueryClient();
    const queryKey = ["library", userId];
    const invalidate = () => queryClient.invalidateQueries({ queryKey });

    return {
        ...useQuery({
            queryKey: queryKey,
            queryFn: async (): Promise<Library | null> => {
                if (!userId) return null;
                return LibrariesService.librariesControllerFindOneByIdWithPermissions(
                    userId,
                );
            },
            enabled: !!userId,
        }),
        queryKey,
        invalidate,
    };
}
