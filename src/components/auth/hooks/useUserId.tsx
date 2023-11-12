import React from "react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const useUserId = (): string | undefined => {
    const session = useSessionContext();
    if (session.loading) return undefined;
    return session.userId;
};

export default useUserId;
