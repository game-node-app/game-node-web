import React from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import ModerationItemDetails from "@/components/admin/moderation/details/ModerationItemDetails";
import CenteredLoading from "@/components/general/CenteredLoading";
import { Box, Group } from "@mantine/core";
import ModerationSidebar from "@/components/admin/moderation/ModerationSidebar";

const Id = () => {
    const router = useRouter();
    const query = router.query;
    const id = query.id;
    const idAsNumber = parseInt(id as string);

    if (Number.isNaN(idAsNumber)) {
        return <CenteredLoading />;
    }

    return (
        <AdminLayout>
            <Group className={"w-full h-full items-start lg:flex-nowrap"}>
                <Box className={"w-full lg:w-3/12"}>
                    <ModerationSidebar />
                </Box>
                <Box className={"w-full lg:w-9/12 mt-4"}>
                    <ModerationItemDetails reportId={idAsNumber} />
                </Box>
            </Group>
        </AdminLayout>
    );
};

export default Id;
