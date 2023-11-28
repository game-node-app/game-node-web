import React, { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import GlobalShellHeader from "@/components/general/shell/GlobalShellHeader/GlobalShellHeader";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import GlobalShellFooter from "@/components/general/shell/GlobalShellFooter";
import GlobalShellNavbar from "@/components/general/shell/GlobalShellNavbar/GlobalShellNavbar";

/**
 * https://mantine.dev/core/app-shell/
 * @param children - The main content of the page
 * @constructor
 */
const GlobalAppShell = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpened, modalUtils] = useDisclosure(false);
    return (
        <AppShell
            padding="xs"
            header={{
                height: { base: 80, md: 70 },
            }}
            footer={{ height: 60, offset: false }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: {
                    mobile: !sidebarOpened,
                    desktop: !sidebarOpened,
                },
            }}
            classNames={{
                main: "bg-mobile lg:bg-desktop bg-cover bg-center bg-fixed",
            }}
        >
            <AppShell.Header>
                <GlobalShellHeader
                    sidebarOpened={sidebarOpened}
                    toggleSidebar={modalUtils.toggle}
                />
            </AppShell.Header>
            <AppShell.Navbar>
                <GlobalShellNavbar
                    sidebarOpened={sidebarOpened}
                    onClose={modalUtils.close}
                />
            </AppShell.Navbar>

            <AppShell.Main>{children}</AppShell.Main>
            <AppShell.Footer pos={"static"}>
                <GlobalShellFooter />
            </AppShell.Footer>
        </AppShell>
    );
};

export default GlobalAppShell;
