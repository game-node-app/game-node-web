import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Box, Group } from "@mantine/core";
import ModerationSidebar from "@/components/admin/moderation/ModerationSidebar";

const Index = () => {
    return (
        <AdminLayout>
            <Group className={"w-full h-full items-start lg:flex-nowrap"}>
                <Box className={"w-full lg:w-3/12"}>
                    <ModerationSidebar />
                </Box>
            </Group>
        </AdminLayout>
    );
};

export default Index;
