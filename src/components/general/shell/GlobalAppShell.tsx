import React, { useState } from "react";
import { AppShell, Box, useMantineTheme } from "@mantine/core";
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
                breakpoint: "xs",
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
                <GlobalShellNavbar onClose={modalUtils.close} />
            </AppShell.Navbar>
            {/**
             Remove 'ps=0' to make the sidebar push the main content to its right when opened
             */}
            <AppShell.Main
                pos={"relative"}
                className={"!ps-0 xl:flex xl:justify-center"}
            >
                <Box className={"w-full xl:max-w-screen-xl"}>{children}</Box>
            </AppShell.Main>
            <AppShell.Footer pos={"static"}>
                <GlobalShellFooter />
            </AppShell.Footer>
        </AppShell>
    );
};

export default GlobalAppShell;
