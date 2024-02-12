import { Avatar, AvatarProps } from "@mantine/core";
import { ProfileAvatar } from "@/wrapper/server";
import { getServerStoredUpload } from "@/util/getServerStoredImages";

const placeholderAvatarImage = "https://i.imgur.com/fGxgcDF.png";

interface UserAvatarProps extends AvatarProps {
    avatar: ProfileAvatar | undefined;
}

export function UserAvatar({ src, avatar, ...others }: UserAvatarProps) {
    const avatarFileSrc = avatar
        ? getServerStoredUpload(`${avatar.filename}.${avatar.extension}`)
        : undefined;

    const srcToUse = avatarFileSrc ? avatarFileSrc : src;
    return <Avatar src={srcToUse} radius="xl" {...others} />;
}
