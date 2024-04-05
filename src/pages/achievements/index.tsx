import React, { useEffect } from "react";
import useUserId from "@/components/auth/hooks/useUserId";
import { useRouter } from "next/router";
import CenteredLoading from "@/components/general/CenteredLoading";

const Index = () => {
    const userId = useUserId();
    const router = useRouter();
    useEffect(() => {
        if (router.isReady && userId) {
            router.push(`/achievements/${userId}`).then().catch();
        }
    }, [router, userId]);
    return <CenteredLoading />;
};

export default Index;
