import { useQuery, useQueryClient } from "react-query";
import { Profile, ProfileService } from "@/wrapper/server";
import { ExtendedUseQueryResult } from "@/util/types/ExtendedUseQueryResult";

export default function useUserProfile(
    userId: string | undefined,
): ExtendedUseQueryResult<Profile | undefined> {
    const queryClient = useQueryClient();
    const queryKey = ["userProfile", userId];
    const invalidate = () => queryClient.invalidateQueries(queryKey);
    return {
        ...useQuery({
            queryKey: queryKey,
            queryFn: async () => {
                if (!userId) return undefined;
                return await ProfileService.profileControllerFindOneById(
                    userId,
                );
            },
            enabled: !!userId,
        }),
        invalidate,
        queryKey,
    };
}
