import React from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import ModerationItemDetails from "@/components/admin/moderation/details/ModerationItemDetails";
import CenteredLoading from "@/components/general/CenteredLoading";

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
            <ModerationItemDetails reportId={idAsNumber} />
        </AdminLayout>
    );
};

export default Id;
