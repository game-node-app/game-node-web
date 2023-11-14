import React from "react";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import { useRouter } from "next/router";
import { Container, Stack, Title, Text } from "@mantine/core";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import useUserProfile from "@/components/profile/hooks/useUserProfile";

const LibraryViewOwnerHome = () => {
    const session = useSessionContext();
    const userProfileQuery = useUserProfile(
        session.loading ? undefined : session.userId,
    );
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
                    Welcome to your library, {userProfileQuery.data?.username}!
                </Title>
            </Stack>
        </Container>
    );
};

export default LibraryViewOwnerHome;
