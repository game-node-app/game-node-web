import React, { useState } from "react";
import {
    AppShell,
    Aside,
    Footer,
    MediaQuery,
    Navbar,
    useMantineTheme,
    Text,
    Burger,
    Header,
    Container,
    ScrollArea,
} from "@mantine/core";
import GlobalShellHeader from "@/components/general/shell/GlobalShellHeader";
import { useDisclosure } from "@mantine/hooks";
import GlobalShellFooter from "@/components/general/shell/GlobalShellFooter";
import GlobalShellNavbar from "@/components/general/shell/navbar/GlobalShellNavbar";

const GlobalShell = ({ children }: { children: React.ReactNode }) => {
    const theme = useMantineTheme();
    const [sidebarOpened, { toggle }] = useDisclosure(false);
    return (
        <AppShell
            padding={0}
            navbar={<GlobalShellNavbar sidebarOpened={sidebarOpened} />}
            footer={<GlobalShellFooter />}
            header={
                <GlobalShellHeader
                    sidebarOpened={sidebarOpened}
                    toggleSidebar={toggle}
                />
            }
            styles={{
                // Because footer is manually set to static, we need to set the main paddingBottom to 0
                main: {
                    paddingBottom: 0,
                },
            }}
        >
            {children}
        </AppShell>
    );
};

export default GlobalShell;
