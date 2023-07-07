import { ILibrary } from "@/util/types/library";
import React, { createContext, useState } from "react";
import useQueryWithParameters from "@/hooks/useQueryWithParameters";
import { useQueryClient } from "react-query";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { IProfile } from "@/util/types/profile";

interface IUserInfoContext {
    userProfile: IProfile | undefined;
    invalidateUserProfileCache: () => void;
    // The library for the current logged in user
    userLibrary: ILibrary | undefined;
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
        url: "/profile",
        method: "GET",
        options: {
            enabled: queryEnabled,
        },
    });

    const libraryQuery = useQueryWithParameters<ILibrary>({
        url: "/libraries",
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
