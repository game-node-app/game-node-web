import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Session from "supertokens-auth-react/recipe/session";
import { useQueryClient } from "@tanstack/react-query";
import CenteredLoading from "@/components/general/CenteredLoading";
import { AuthService } from "@/wrapper/server";
import { signOut } from "supertokens-auth-react/recipe/thirdpartypasswordless";

const Logout = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    useEffect(() => {
        let ignore = false;
        (async () => {
            if (ignore) return;
            await signOut();
            queryClient.clear();
            router.push("/search");
        })();
        return () => {
            ignore = true;
        };
    }, [queryClient, router]);
    return <CenteredLoading></CenteredLoading>;
};

export default Logout;
