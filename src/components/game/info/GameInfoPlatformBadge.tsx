import {
    Badge,
    BadgeProps,
    DefaultMantineColor,
    MantineColor,
    StyleProp,
    Title,
} from "@mantine/core";
import { GamePlatform } from "@/wrapper/server";
import React from "react";
import {
    IconBrandWindows,
    IconBrandXbox,
    IconDeviceNintendo,
    IconPlaystationCircle,
    IconPlaystationSquare,
    IconPlaystationTriangle,
    IconPlaystationX,
} from "@tabler/icons-react";
import { theme } from "@/pages/_app";

interface IGameInfoPlatformBadgeProps extends BadgeProps {
    platformAbbreviation: string;
}

const platformIconStore: {
    [key in GamePlatform["abbreviation"]]: {
        icon: React.FC<any> | undefined;
        color: DefaultMantineColor | undefined;
    };
} = {
    PS1: {
        icon: IconPlaystationTriangle,
        color: "blue",
    },
    PS2: {
        icon: IconPlaystationX,
        color: "blue",
    },
    PS3: {
        icon: IconPlaystationCircle,
        color: "blue",
    },
    PS4: {
        icon: IconPlaystationSquare,
        color: "blue",
    },
    PS5: {
        icon: IconPlaystationTriangle,
        color: "blue",
    },
    PC: {
        icon: IconBrandWindows,
        color: "teal",
    },
    XONE: {
        icon: IconBrandXbox,
        color: "green",
    },
    "Series X": {
        icon: IconBrandXbox,
        color: "green",
    },
    Switch: {
        icon: IconDeviceNintendo,
        color: "red",
    },

    default: {
        icon: undefined,
        color: "gray",
    },
};

const platformToIcon = (platform: string) =>
    platformIconStore[platform] ?? platformIconStore["default"];

const GameInfoPlatformBadge = ({
    platformAbbreviation,
    color,
    ...others
}: IGameInfoPlatformBadgeProps) => {
    const toIcon = platformToIcon(platformAbbreviation);
    const iconToRender = toIcon.icon ? <toIcon.icon /> : undefined;
    const colorToUse = color ?? toIcon.color;
    return (
        <Badge
            color={theme.colors.teal[0]}
            bg={colorToUse}
            leftSection={iconToRender}
            variant={"filled"}
            w={85}
            {...others}
        >
            {platformAbbreviation}
        </Badge>
    );
};

export default GameInfoPlatformBadge;
