import { useQuery } from "react-query";
import { LibrariesService } from "@/wrapper";

export function useUserLibrary(userId: string | undefined) {
    return useQuery({
        queryKey: ["library", userId],
        queryFn: async () => {
            if (!userId) return undefined;
            return LibrariesService.librariesControllerFindOneByIdWithPermissions(
                userId,
                {
                    relations: {
                        collections: true,
                    },
                },
            );
        },
        enabled: !!userId,
    });
}
