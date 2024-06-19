import React from "react";
import { Paper, Stack, Text } from "@mantine/core";
import ModerationReportList from "@/components/admin/moderation/list/ModerationReportList";

interface Props {
    onReportSelected: (reportId: number) => void;
}

const ModerationSidebar = () => {
    return (
        <Stack className={"w-full gap-0"}>
            <Paper
                className={
                    "w-full flex justify-center items-center border-0 rounded-[0] h-[64px]"
                }
                styles={{
                    root: {
                        backgroundColor: "#202020",
                    },
                }}
            >
                <Text className={"text-center"}>Reports</Text>
            </Paper>
            <ModerationReportList />
        </Stack>
    );
};

export default ModerationSidebar;
