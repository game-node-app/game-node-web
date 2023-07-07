import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { signOut } from "supertokens-auth-react/recipe/thirdpartypasswordless";

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        signOut().then(() => {
            router.push("/");
        });
    }, []);
    return <div></div>;
};

export default Logout;
