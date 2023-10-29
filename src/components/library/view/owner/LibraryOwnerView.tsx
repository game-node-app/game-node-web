import React from "react";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import { useRouter } from "next/router";
import { Container, Stack, Title } from "@mantine/core";

const LibraryOwnerView = () => {
    const router = useRouter();
    const { userId } = router.query;
    const library = useUserLibrary(userId as string | undefined);
    return (
        <Container fluid p={0}>
            <Stack w={"100%"} h={"100%"} justify={"center"} align={"center"}>
                <Title ta={"center"}>Welcome to your library, </Title>
            </Stack>
        </Container>
    );
};

export default LibraryOwnerView;
