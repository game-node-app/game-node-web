import {
    Group,
    Text,
    UnstyledButton,
    UnstyledButtonProps,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";
import classes from "./UserButton.module.css";
import { UserAvatar } from "@/components/general/input/UserAvatar";

interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    username: string;
    description: string;
}

export function UserButton({
    image,
    username,
    description,
    ...others
}: UserButtonProps) {
    return (
        <UnstyledButton className={classes.user} {...others}>
            <Group wrap={"nowrap"} p={"md"} w={"100%"}>
                <UserAvatar src={image} />

                <div style={{ flex: 1 }}>
                    <Text size="sm">{username}</Text>

                    <Text c="dimmed" size="xs">
                        {description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    );
}
