import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    rem,
    UnstyledButtonProps,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";
import classes from "./UserButton.module.css";

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
            <Group wrap={"nowrap"} p={"md"}>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" w={500}>
                        {username}
                    </Text>

                    <Text c="dimmed" size="xs">
                        Seeker of Souls
                    </Text>
                </div>

                <IconSelector size="0.9rem" stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}
