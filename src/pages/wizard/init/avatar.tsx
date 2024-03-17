import React from "react";
import { Box, Button, Container, Flex, Stack, Title } from "@mantine/core";
import PreferencesAvatarUploader from "@/components/preferences/handlers/PreferencesAvatarUploader";
import { useRouter } from "next/router";

const Avatar = () => {
    const router = useRouter();
    const onFinish = () => {
        router.push("/search");
    };
    return (
        <Container fluid mih={"100vh"}>
            <Title size={"h3"} className={"text-center my-8"}>
                Upload a nice avatar so everyone can recognize you!
            </Title>
            <Stack className={"flex-wrap items-center"}>
                <Box className={"w-full lg:w-8/12"}>
                    <PreferencesAvatarUploader onClose={onFinish} />
                    <Flex className={"w-full justify-end mt-6"}>
                        <Button color={"teal"} onClick={onFinish}>
                            Skip
                        </Button>
                    </Flex>
                </Box>
            </Stack>
        </Container>
    );
};

export default Avatar;
