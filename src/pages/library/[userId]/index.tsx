import React, { useState } from "react";
import { useRouter } from "next/router";
import useUserInfo from "@/hooks/useUserInfo";

const Index = () => {
    const router = useRouter();
    const userInfo = useUserInfo();
    const { userId } = router.query;
    const [isOwnLibrary, setIsOwnLibrary] = useState(false);
    return <div></div>;
};

export default Index;
