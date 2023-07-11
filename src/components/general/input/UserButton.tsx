import {
    UnstyledButton,
    UnstyledButtonProps,
    Group,
    Avatar,
    Text,
    createStyles,
} from "@mantine/core";
import { IconChevronRight, IconSelector } from "@tabler/icons-react";
import React from "react";

const useStyles = createStyles((theme) => ({
    user: {
        display: "block",
        width: "100%",
        padding: theme.spacing.md,
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[8]
                    : theme.colors.gray[0],
        },
    },
}));

interface UserButtonProps extends UnstyledButtonProps {
    image: string;
    username: string;
    description: string;
}

export default function UserButton({
    image,
    username,
    description,
    ...others
}: UserButtonProps) {
    const { classes } = useStyles();

    return (
        <UnstyledButton className={classes.user} {...others}>
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" weight={500}>
                        {username}
                    </Text>

                    <Text color="dimmed" size="xs">
                        Seeker of Souls
                    </Text>
                </div>

                <IconSelector size="0.9rem" stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}
