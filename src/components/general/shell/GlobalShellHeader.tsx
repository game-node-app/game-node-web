import { useState } from "react";
import {
    createStyles,
    Header,
    Container,
    Group,
    Burger,
    rem,
    Box,
    Paper,
    Transition,
    Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import Link from "next/link";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const useStyles = createStyles((theme) => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("xs")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("xs")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).background,
            color: theme.fn.variant({
                variant: "light",
                color: theme.primaryColor,
            }).color,
        },
    },
}));

interface IGlobalShellHeaderProps {
    sidebarOpened: boolean;
    toggleSidebar: () => void;
}

export default function GlobalShellHeader({
    sidebarOpened,
    toggleSidebar,
}: IGlobalShellHeaderProps) {
    const { classes, cx } = useStyles();
    const session = useSessionContext();

    return (
        <Header p="sm" height={{ base: 80, md: 70 }}>
            <Container
                fluid
                className="flex h-full items-center lg:justify-start"
            >
                <Burger
                    opened={sidebarOpened}
                    onClick={toggleSidebar}
                    size="sm"
                />
                <Link href={"/"}>
                    <GameNodeLogo className="ms-6 w-22 h-auto max-h-full" />
                </Link>
                {!session.loading && !session.doesSessionExist && (
                    <Box className="ms-auto">
                        <Link href={"/auth"}>
                            <Button variant="outline">Join in</Button>
                        </Link>
                    </Box>
                )}
            </Container>
        </Header>
    );
}
