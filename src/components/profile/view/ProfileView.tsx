import React, { PropsWithChildren } from "react";
import { Box, Container, Flex, Group } from "@mantine/core";
import ProfileUserDescription from "@/components/profile/view/ProfileUserDescription";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";

interface Props {
    userId: string;
}

const ProfileView = ({ userId }: Props) => {
    return (
        <Flex justify={"center"} className={"mb-12 w-full justify-center"}>
            <Group
                className={
                    "w-full lg:w-10/12 h-full flex-wrap lg:!flex-nowrap items-start lg:mt-20"
                }
            >
                <Box className={"w-full lg:w-3/12"}>
                    <ProfileUserDescription userId={userId} />
                </Box>
                <Box className={"w-full lg:w-9/12"}>
                    <ProfileFavoriteGames userId={userId} />
                </Box>
            </Group>
        </Flex>
    );
};

export default ProfileView;
