import React from "react";
import {
    ActionIcon,
    Anchor,
    Container,
    Footer,
    Group,
    Text,
} from "@mantine/core";
import GameNodeLogo from "@/components/general/GameNodeLogo";
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
                <Text color="dimmed">{link.label}</Text>
            </Link>
        );
    });
    return (
        <Footer height={60} p="md" pos="static">
            <Container
                fluid
                p={0}
                className="flex justify-between gap-8 w-full h-full items-center"
            >
                <Group className="" noWrap>
                    {items}
                </Group>
                <Group spacing="xs" position="right" noWrap>
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
        </Footer>
    );
};

export default GlobalShellFooter;
