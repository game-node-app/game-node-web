import React, { PropsWithChildren } from "react";
import { Box, Container, Group } from "@mantine/core";
import ProfileUserDescription from "@/components/profile/view/ProfileUserDescription";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";

interface Props {
    userId: string;
}

const ProfileView = ({ userId }: Props) => {
    return (
        <Container fluid className={"mb-12"}>
            <Group
                className={
                    "w-full h-full flex-wrap lg:!flex-nowrap items-start mt-20"
                }
            >
                <Box className={"w-full lg:w-1/6"}>
                    <ProfileUserDescription userId={userId} />
                </Box>
                <Box className={"w-full lg:w-5/6"}>
                    <ProfileFavoriteGames userId={userId} />
                </Box>
            </Group>
        </Container>
    );
};

export default ProfileView;
