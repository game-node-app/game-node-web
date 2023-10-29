import React, { useEffect } from "react";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";

const Index = () => {
    const userInfo = useUserInfo();
    const router = useRouter();
    useEffect(() => {
        if (userInfo != undefined) {
            const userId = userInfo.userLibrary?.userId;
            if (router.isReady) router.push(`/library/${userId}`);
        }
    }, [router, userInfo]);
    return <div></div>;
};

export default Index;
