import { Badge, BadgeProps } from "@mantine/core";

interface IGameInfoPlatformBadgeProps extends BadgeProps {
    platform: string;
}

const GameInfoPlatformBadge = ({
    platform,
    ...others
}: IGameInfoPlatformBadgeProps) => {
    return <Badge {...others}>{platform}</Badge>;
};

export default GameInfoPlatformBadge;
