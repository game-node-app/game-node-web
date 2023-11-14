import { Avatar, AvatarProps } from "@mantine/core";

const placeholderAvatarImage = "https://i.imgur.com/fGxgcDF.png";

interface UserAvatarProps extends AvatarProps {
    src: string | undefined;
}

export function UserAvatar({ src, ...others }: UserAvatarProps) {
    return (
        <Avatar
            src={src && src.length > 0 ? src : placeholderAvatarImage}
            radius="xl"
            {...others}
        />
    );
}
