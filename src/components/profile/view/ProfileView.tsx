import React, { PropsWithChildren } from "react";
import { Box, Container, Flex, Group, Stack } from "@mantine/core";
import ProfileUserInfo from "@/components/profile/view/ProfileUserInfo";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";
import { DetailsBox } from "@/components/general/DetailsBox";
import RecentActivitiesList from "@/components/activity/RecentActivitiesList";

interface Props {
    userId: string;
}

const ProfileView = ({ userId }: Props) => {
    return (
        <Flex justify={"center"} className={"mb-12 w-full justify-center"}>
            <Group
                className={
                    "w-full lg:w-10/12 h-full flex-wrap lg:!flex-nowrap items-start lg:mt-10"
                }
            >
                <Box className={"w-full lg:w-3/12"}>
                    <ProfileUserInfo userId={userId} />
                </Box>
                <Stack className={"w-full lg:w-9/12"}>
                    <DetailsBox
                        title={"Favorite games"}
                        stackProps={{
                            className: "",
                        }}
                    >
                        <ProfileFavoriteGames userId={userId} />
                    </DetailsBox>
                    <DetailsBox
                        title={"Recent Activity"}
                        stackProps={{
                            className: "",
                        }}
                    >
                        <RecentActivitiesList userId={userId} />
                    </DetailsBox>
                </Stack>
            </Group>
        </Flex>
    );
};

export default ProfileView;
