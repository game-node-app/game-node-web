import React from "react";
import { useRouter } from "next/router";
import ProfileView from "@/components/profile/view/ProfileView";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { CollectionsService, ProfileService } from "@/wrapper/server";
import { DehydrationResult } from "@/pages/_app";
import {
    Box,
    Container,
    Divider,
    Group,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import ProfileViewBackground from "@/components/profile/view/ProfileViewBackground";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import ProfileUserInfo from "@/components/profile/view/ProfileUserInfo";
import ProfileViewNavbar from "@/components/profile/view/ProfileViewNavbar";
import ProfileFollowActions from "@/components/profile/view/ProfileFollowActions";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";
import RecentActivityList from "@/components/activity/RecentActivityList";

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

    const profileQuery = useUserProfile(userIdString);

    return (
        <Stack className={"w-full h-full gap-0 mt-3 mb-12"}>
            <ProfileViewBackground userId={userIdString} />
            <Group
                className={
                    "w-full justify-start items-start flex-wrap lg:flex-nowrap"
                }
            >
                <Stack
                    className={
                        "w-full lg:w-1/5 h-full bg-[#161616] gap-0 relative"
                    }
                >
                    <Stack className={"w-full items-center relative -top-20"}>
                        <UserAvatar
                            className={""}
                            userId={userIdString}
                            size={"10rem"}
                        />
                        <Text className={""}>
                            {profileQuery.data?.username}
                        </Text>
                    </Stack>
                    <Stack className={"w-full h-full relative -top-14"}>
                        <ProfileUserInfo userId={userIdString} />
                    </Stack>
                </Stack>
                <Stack
                    className={
                        "lg:items-start w-full lg:w-4/5 p-1 lg:p-3 lg:mt-4"
                    }
                >
                    <ProfileViewNavbar userId={userIdString} />
                    <Box className={"w-full mt-6 mb-4"}>
                        <ProfileFavoriteGames userId={userIdString} />
                    </Box>
                    <Divider
                        className={"w-full mt-6 mb-2"}
                        label={"Recent activity"}
                    />
                    <RecentActivityList userId={userIdString} limit={7} />
                </Stack>
            </Group>
        </Stack>
    );
};

export default Index;
