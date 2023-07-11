import React, { useState } from "react";
import { Box, Container, Stack } from "@mantine/core";
import SearchBar from "@/components/search/SearchBar";

const Index = () => {
    const [value, setValue] = useState<string>("");

    return (
        <Container fluid mih={"100%"} p={0}>
            <Container
                mih={"80vh"}
                fluid
                className="bg-mobile lg:bg-desktop bg-cover  bg-center"
            >
                <Stack align="center" w={"100%"}>
                    <Box className="w-5/6 mt-12">
                        <SearchBar
                            withButton
                            label={"Search"}
                            value={value}
                            onChange={(evt) => {
                                setValue(evt.currentTarget.value);
                            }}
                        />
                    </Box>
                </Stack>
            </Container>
        </Container>
    );
};

export default Index;
