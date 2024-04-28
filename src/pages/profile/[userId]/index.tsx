import React from "react";
import { useRouter } from "next/router";
import ProfileView from "@/components/profile/view/ProfileView";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { CollectionsService, ProfileService } from "@/wrapper/server";
import { DehydrationResult } from "@/pages/_app";

export async function getServerSideProps(
    ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<DehydrationResult>> {
    const query = ctx.query;
    const userId = query.userId as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["userProfile", userId],
        queryFn: () => {
            const profile = ProfileService.profileControllerFindOneById(userId);
            if (!profile) {
                return null;
            }
            return profile;
        },
    });

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}

const Index = () => {
    const router = useRouter();
    const { userId } = router.query;
    return <ProfileView userId={userId as string} />;
};

export default Index;
