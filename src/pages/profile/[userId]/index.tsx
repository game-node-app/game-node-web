import React from "react";
import { useRouter } from "next/router";
import ProfileView from "@/components/profile/view/ProfileView";

const Index = () => {
    const router = useRouter();
    const { userId } = router.query;
    return <ProfileView userId={userId as string} />;
};

export default Index;
