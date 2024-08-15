import React, { PropsWithChildren } from "react";
import ModerationSidebar from "@/components/admin/moderation/ModerationSidebar";
import { Box, Group, Stack } from "@mantine/core";
import SessionAuthWithRoles from "@/components/auth/SessionAuthWithRoles";
import { EUserRoles } from "@/components/auth/roles";
import AdminLayoutTabs from "@/components/admin/AdminLayoutTabs";

const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <SessionAuthWithRoles roles={[EUserRoles.MOD, EUserRoles.ADMIN]}>
            <Stack className={"w-full flex-wrap justify-start gap-1"}>
                <AdminLayoutTabs />
                {children}
            </Stack>
        </SessionAuthWithRoles>
    );
};

export default AdminLayout;
