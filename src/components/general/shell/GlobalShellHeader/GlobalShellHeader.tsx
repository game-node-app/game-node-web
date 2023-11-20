import { Container, Burger, Box, Button, AppShell } from "@mantine/core";
import GameNodeLogo from "@/components/general/GameNodeLogo";
import Link from "next/link";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface IGlobalShellHeaderProps {
    sidebarOpened: boolean;
    toggleSidebar: () => void;
}

export default function GlobalShellHeader({
    sidebarOpened,
    toggleSidebar,
}: IGlobalShellHeaderProps) {
    const session = useSessionContext();

    return (
        <header className="h-full">
            <Container
                fluid
                className="flex h-full items-center lg:justify-start"
            >
                <Burger
                    opened={sidebarOpened}
                    onClick={toggleSidebar}
                    size="sm"
                />
                <Link href={"/search"}>
                    <GameNodeLogo className="ms-6 w-22 h-auto max-h-full" />
                </Link>
                {!session.loading && !session.doesSessionExist && (
                    <Box className="ms-auto">
                        <Link href={"/auth"}>
                            <Button variant="outline">Sign in</Button>
                        </Link>
                    </Box>
                )}
            </Container>
        </header>
    );
}
