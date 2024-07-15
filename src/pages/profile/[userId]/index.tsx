import React from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { ProfileService } from "@/wrapper/server";
import { DehydrationResult } from "@/pages/_app";
import { Box, Container, Divider } from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import ProfileViewNavbar from "@/components/profile/view/ProfileViewNavbar";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";
import RecentActivityList from "@/components/activity/RecentActivityList";
import ProfileUserInfoWithBanner from "@/components/profile/view/ProfileUserInfoWithBanner";
import useUserId from "@/components/auth/hooks/useUserId";

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
    const userIdString = userId as string;

    const ownUserId = useUserId();

    const profileQuery = useUserProfile(userIdString);

    return (
        <Box className={"w-full h-full xl:flex xl:justify-center"}>
            <Box className={"mt-3 mb-12 xl:max-w-screen-xl"}>
                <ProfileUserInfoWithBanner userId={userIdString}>
                    <ProfileViewNavbar userId={userIdString} />
                    <Box className={"w-full mt-6 mb-4"}>
                        <ProfileFavoriteGames userId={userIdString} />
                    </Box>
                    <Divider
                        className={"w-full mt-6 mb-2"}
                        label={"Recent activity"}
                    />
                    <RecentActivityList userId={userIdString} limit={7} />
                </ProfileUserInfoWithBanner>
            </Box>
        </Box>
    );
};

export default Index;
