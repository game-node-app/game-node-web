import React from "react";
import { Center, Loader } from "@mantine/core";

const CenteredLoading = () => {
    return (
        <Center w={"100%"} h={"100%"}>
            <Loader variant="bars" />
        </Center>
    );
};

export default CenteredLoading;
