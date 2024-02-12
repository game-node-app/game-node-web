import { Container, Burger, Box, Button, AppShell } from "@mantine/core";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import Link from "next/link";
import { IconAdjustmentsCog, IconSettings } from "@tabler/icons-react";
import useUserId from "@/components/auth/hooks/useUserId";
import { useState } from "react";
import PreferencesModal from "@/components/preferences/PreferencesModal";
import { useDisclosure } from "@mantine/hooks";

interface IGlobalShellHeaderProps {
    sidebarOpened: boolean;
    toggleSidebar: () => void;
}

export default function GlobalShellHeader({
    sidebarOpened,
    toggleSidebar,
}: IGlobalShellHeaderProps) {
    const userId = useUserId();
    const [preferencesModalOpened, preferencesModalUtils] =
        useDisclosure(false);
    return (
        <header className="h-full">
            <Container
                fluid
                className="flex h-full items-center lg:justify-start"
            >
                <PreferencesModal
                    opened={preferencesModalOpened}
                    onClose={preferencesModalUtils.close}
                />
                <Burger
                    opened={sidebarOpened}
                    onClick={toggleSidebar}
                    size="sm"
                />
                <Link href={"/search"}>
                    <GameNodeLogo className="ms-6 w-22 h-auto max-h-full" />
                </Link>
                {!userId && (
                    <Box className="ms-auto">
                        <Link href={"/auth"}>
                            <Button variant="outline">Sign in</Button>
                        </Link>
                    </Box>
                )}
                {userId && (
                    <Link
                        href={"#"}
                        onClick={(evt) => {
                            evt.preventDefault();
                            preferencesModalUtils.open();
                        }}
                        className={"ms-auto"}
                    >
                        <IconSettings size={"1.9rem"} />
                    </Link>
                )}
            </Container>
        </header>
    );
}
