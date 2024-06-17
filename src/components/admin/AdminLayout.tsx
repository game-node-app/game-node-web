import React, { PropsWithChildren } from "react";
import ModerationSidebar from "@/components/admin/moderation/ModerationSidebar";
import { Box, Group, Stack } from "@mantine/core";
import SessionAuthWithRoles from "@/components/auth/SessionAuthWithRoles";
import { EUserRoles } from "@/components/auth/roles";
import AdminLayoutTabs from "@/components/admin/AdminLayoutTabs";

const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <SessionAuthWithRoles roles={[EUserRoles.MOD, EUserRoles.ADMIN]}>
            <Stack className={"w-full h-full flex-wrap justify-start gap-1"}>
                <AdminLayoutTabs />
                <Group className={"w-full h-full items-start flex-nowrap"}>
                    <Box className={"w-full lg:w-3/12"}>
                        <ModerationSidebar />
                    </Box>
                    <Box className={"w-full lg:w-9/12 mt-4"}>{children}</Box>
                </Group>
            </Stack>
        </SessionAuthWithRoles>
    );
};

export default AdminLayout;
