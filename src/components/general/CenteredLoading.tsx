import React from "react";
import { Center, CenterProps, Loader } from "@mantine/core";

interface Props extends CenterProps {}

const CenteredLoading = (props: Props) => {
    return (
        <Center w={"100%"} h={"100%"} {...props}>
            <Loader variant="bars" />
        </Center>
    );
};

export default CenteredLoading;
