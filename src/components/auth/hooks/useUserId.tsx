import { useSessionContext } from "supertokens-auth-react/recipe/session";

const useUserId = (): string | undefined => {
    const session = useSessionContext();

    if (!session.loading && session.doesSessionExist) {
        return session.userId;
    }

    return undefined;
};

export default useUserId;
