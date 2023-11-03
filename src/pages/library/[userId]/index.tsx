import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LibraryViewOwnerHome from "@/components/library/view/home/LibraryViewOwnerHome";
import LibraryViewGuestHome from "@/components/library/view/home/LibraryViewGuestHome";
import { Container } from "@mantine/core";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import LibraryView from "@/components/library/view/LibraryView";

const Index = () => {
    const session = useSessionContext();
    const router = useRouter();
    const { userId } = router.query;
    const [isOwnLibrary, setIsOwnLibrary] = useState(() => {
        if (!session.loading && session.doesSessionExist) {
            return session.userId === userId;
        }
        return false;
    });

    useEffect(() => {
        if (!session.loading && session.doesSessionExist) {
            setIsOwnLibrary(session.userId === userId);
        }
    }, [session, userId]);

    return (
        <LibraryView userId={userId as string | undefined}>
            {isOwnLibrary ? <LibraryViewOwnerHome /> : <LibraryViewGuestHome />}
        </LibraryView>
    );
};

export default Index;
