import React from "react";
import { useRouter } from "next/router";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { Container, Stack, Text, Title } from "@mantine/core";

const LibraryViewGuestHome = () => {
    const router = useRouter();
    const { userId } = router.query;
    const userProfileQuery = useUserProfile(userId as string | undefined);
    return (
        <Container fluid p={0}>
            <Stack
                w={"100%"}
                h={"100%"}
                justify={"center"}
                align={"center"}
                mt={"xl"}
            >
                <Title ta={"center"} size={"h4"} mt={"lg"}>
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Welcome to {userProfileQuery.data?.username}'s library!
                </Title>
            </Stack>
        </Container>
    );
};

export default LibraryViewGuestHome;
