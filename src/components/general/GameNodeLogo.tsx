import React from "react";
import { Image } from "@mantine/core";
interface GameNodeLogoProps extends React.ComponentPropsWithoutRef<"img"> {}
const GameNodeLogo = ({ ...props }: GameNodeLogoProps) => {
    return (
        <img
            className="w-full h-auto max-h-full "
            {...props}
            src={"/img/main-logo.png"}
        />
    );
};

export default GameNodeLogo;
