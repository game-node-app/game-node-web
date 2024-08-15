import React, { useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import {
    Box,
    ComboboxItem,
    Container,
    Group,
    Paper,
    Select,
    Stack,
    Text,
} from "@mantine/core";
import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import { DetailsBox } from "@/components/general/DetailsBox";
import AchievementsGenerateCodeView from "@/components/admin/achievements/view/AchievementsGenerateCodeView";
import AchievementsIssueView from "@/components/admin/achievements/view/AchievementsIssueView";

const Index = () => {
    return (
        <AdminLayout>
            <Box className={"w-full h-full mt-3 lg:mt-0 lg:p-6"}>
                <Group
                    className={
                        "w-full h-full justify-around flex-wrap lg:flex-nowrap"
                    }
                >
                    <Paper
                        className={"bg-[#161616] w-full lg:w-1/2 min-h-[500px]"}
                    >
                        <AchievementsGenerateCodeView />
                    </Paper>
                    <Paper
                        className={"bg-[#161616] w-full lg:w-1/2 min-h-[500px]"}
                    >
                        <AchievementsIssueView />
                    </Paper>
                </Group>
            </Box>
        </AdminLayout>
    );
};

export default Index;
