import {
    Badge,
    BadgeProps,
    DefaultMantineColor,
    MantineColor,
    StyleProp,
    Title,
} from "@mantine/core";
import { GamePlatform } from "@/wrapper";
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

interface IGameInfoPlatformBadgeProps extends BadgeProps {
    platform: string;
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
        color: undefined,
    },
};

const platformToIcon = (platform: string) =>
    platformIconStore[platform] ?? platformIconStore["default"];

const GameInfoPlatformBadge = ({
    platform,
    ...others
}: IGameInfoPlatformBadgeProps) => {
    const { icon: Icon, color } = platformToIcon(platform);
    const iconToRender = Icon ? <Icon /> : undefined;
    return (
        <Badge color={color} leftSection={iconToRender} {...others}>
            {platform}
        </Badge>
    );
};

export default GameInfoPlatformBadge;
