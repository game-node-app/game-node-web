import {
    Group,
    Text,
    UnstyledButton,
    UnstyledButtonProps,
} from "@mantine/core";
import classes from "./UserButton.module.css";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import useUserProfile from "@/components/profile/hooks/useUserProfile";

interface UserButtonProps extends UnstyledButtonProps {
    userId: string;
}

export function UserButton({ userId, ...others }: UserButtonProps) {
    const profile = useUserProfile(userId);
    return (
        <UnstyledButton className={classes.user} {...others}>
            <Group wrap={"nowrap"} p={"md"} w={"100%"}>
                <UserAvatar userId={userId} />

                <div style={{ flex: 1 }}>
                    <Text size="sm">{profile.data?.username}</Text>

                    <Text c="dimmed" size="xs">
                        Seeker of Souls
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    );
}
