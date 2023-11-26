import React from "react";
import {
    ActionIcon,
    Anchor,
    AppShell,
    Container,
    Group,
    Text,
} from "@mantine/core";
import Link from "next/link";
import {
    IconBrandDiscord,
    IconBrandGithub,
    IconBrandTwitter,
} from "@tabler/icons-react";

type IFooterLink = { href: string; label: string };

const links: IFooterLink[] = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const GlobalShellFooter = () => {
    const items = links.map((link) => {
        return (
            <Link key={link.label} href={link.href}>
                <Text c="dimmed">{link.label}</Text>
            </Link>
        );
    });
    return (
        <footer className={"w-full p-2 px-4 h-full "}>
            <Container
                fluid
                p={0}
                className="flex justify-between gap-8 w-full h-full items-center"
            >
                <Group className="" wrap={"nowrap"}>
                    {items}
                </Group>
                <Group gap="xs" justify="right" wrap={"nowrap"}>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <IconBrandGithub size="1.05rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <IconBrandDiscord size="1.05rem" stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon size="lg" variant="default" radius="xl">
                        <IconBrandTwitter size="1.05rem" stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Container>
        </footer>
    );
};

export default GlobalShellFooter;
