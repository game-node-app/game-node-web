import React, { createContext, useState } from "react";
import useQueryWithParameters from "@/hooks/useQueryWithParameters";
import { useQuery, useQueryClient } from "react-query";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { LibrariesService, Library, Profile, ProfileService } from "@/wrapper";

interface IUserInfoContext {
    userProfile: Profile | undefined;
    /**
     * Invalidates the cache for the user's profile.
     * Use this to force a refetch of the user's profile.
     */
    invalidateUserProfileCache: () => void;
    // The library for the current logged in user
    userLibrary: Library | undefined;
    /**
     * Invalidates the cache for the user's library.
     * Use this to force a refetch of the user's library.
     */
    invalidateUserLibraryCache: () => void;
}

export const UserInfoContext = createContext<IUserInfoContext>(
    {} as IUserInfoContext,
);

interface IUserInfoProviderProps {
    children: React.ReactNode;
}

/**
 * Must be a child of SuperTokensProvider
 * @param children
 * @constructor
 */
const UserInfoProvider = ({ children }: IUserInfoProviderProps) => {
    const session = useSessionContext();
    const queryClient = useQueryClient();

    const queryEnabled =
        !session.loading && session.doesSessionExist && session.userId !== "";

    const profileQuery = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            return await ProfileService.profileControllerFindOwn();
        },
    });

    const libraryQuery = useQuery<Library>({
        queryKey: ["library"],
        queryFn: async () => {
            return await LibrariesService.librariesControllerFindOwn({
                relations: {
                    collections: true,
                },
            });
        },
    });

    const invalidateQueryKey = (key: "library" | "profile") => {
        queryClient.invalidateQueries(key).then();
    };

    return (
        <UserInfoContext.Provider
            value={{
                userProfile: profileQuery.data,
                invalidateUserProfileCache: () => {
                    invalidateQueryKey("profile");
                },
                userLibrary: libraryQuery.data,
                invalidateUserLibraryCache: () => {
                    invalidateQueryKey("library");
                },
            }}
        >
            {children}
        </UserInfoContext.Provider>
    );
};

export default UserInfoProvider;
