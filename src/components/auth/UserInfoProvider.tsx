import { ILibrary } from "@/util/types/library";
import React, { createContext, useState } from "react";
import useQueryWithParameters from "@/hooks/useQueryWithParameters";
import { useQueryClient } from "react-query";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { IProfile } from "@/util/types/profile";

interface IUserInfoContext {
    userProfile: IProfile | undefined;
    /**
     * Invalidates the cache for the user's profile.
     * Use this to force a refetch of the user's profile.
     */
    invalidateUserProfileCache: () => void;
    // The library for the current logged in user
    userLibrary: ILibrary | undefined;
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

    const profileQuery = useQueryWithParameters<IProfile>({
        url: "/v1/profile",
        method: "GET",
        options: {
            enabled: queryEnabled,
        },
    });

    const libraryQuery = useQueryWithParameters<ILibrary>({
        url: "/v1/libraries",
        method: "GET",
        options: {
            enabled: queryEnabled,
        },
    });

    const invalidateQueryKey = (key: any) => {
        queryClient.invalidateQueries(key).then();
    };

    return (
        <UserInfoContext.Provider
            value={{
                userProfile: profileQuery.data,
                invalidateUserProfileCache: () => {
                    invalidateQueryKey(profileQuery.queryKey);
                },
                userLibrary: libraryQuery.data,
                invalidateUserLibraryCache: () => {
                    invalidateQueryKey(libraryQuery.queryKey);
                },
            }}
        >
            {children}
        </UserInfoContext.Provider>
    );
};

export default UserInfoProvider;
