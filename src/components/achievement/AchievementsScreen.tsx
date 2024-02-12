import React, { useState } from "react";
import {
    Box,
    Button,
    Center,
    Divider,
    Group,
    Pagination,
    Paper,
    Progress,
    SimpleGrid,
    Stack,
} from "@mantine/core";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import useUserId from "@/components/auth/hooks/useUserId";
import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import AchievementItem from "@/components/achievement/AchievementItem";
import UserLevelInfo from "@/components/user-level/UserLevelInfo";

interface Props {
    targetUserId: string;
}

const AchievementsScreen = ({ targetUserId }: Props) => {
    const userId = useUserId();
    const [paginationData, setPaginationData] = useState({
        offset: 0,
        limit: 8,
    });
    const achievements = useAchievements(paginationData);
    const isOwnUserId = userId != undefined && userId === targetUserId;
    if (!targetUserId) return null;
    return (
        <Paper className={"w-full h-full"}>
            <Stack w={"100%"} py={"3rem"} px={"2rem"}>
                {achievements.isError && (
                    <Center className={"mt-10"}>
                        Something happened while loading achievements. Please
                        try again.
                    </Center>
                )}
                <Group
                    wrap={"nowrap"}
                    className={"justify-center lg:justify-between lg:mx-4"}
                >
                    <Box className={"w-5/12 lg:w-4/12"}>
                        <UserLevelInfo targetUserId={targetUserId} />
                    </Box>

                    {isOwnUserId && (
                        <Button className={""}>Redeem a code</Button>
                    )}
                </Group>
                <Box className={"w-full"}>
                    <Divider />
                </Box>
                <SimpleGrid
                    cols={{
                        base: 1,
                        lg: 2,
                    }}
                >
                    {achievements.data?.data?.map((achievement) => {
                        return (
                            <AchievementItem
                                key={achievement.id}
                                targetUserId={targetUserId}
                                achievement={achievement}
                            />
                        );
                    })}
                </SimpleGrid>
                <Center mt={"1rem"}>
                    <Pagination
                        total={achievements.data?.pagination?.totalPages || 1}
                        onChange={(page) => {
                            const pageAsOffset =
                                paginationData.limit * (page - 1);
                            setPaginationData({
                                offset: pageAsOffset,
                                limit: paginationData.limit,
                            });
                        }}
                    />
                </Center>
            </Stack>
        </Paper>
    );
};

export default AchievementsScreen;
