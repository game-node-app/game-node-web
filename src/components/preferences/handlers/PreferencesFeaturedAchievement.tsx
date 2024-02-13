import React from "react";
import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import { Stack } from "@mantine/core";
import { useFeaturedObtainedAchievement } from "@/components/achievement/hooks/useFeaturedObtainedAchievement";
import useUserId from "@/components/auth/hooks/useUserId";

const PreferencesFeaturedAchievement = () => {
    const userId = useUserId();
    const achievements = useAchievements({
        limit: 1000,
    });
    const featuredObtainedAchievement = useFeaturedObtainedAchievement(userId);
    const featuredAchievement = achievements.data?.data.find((achievement) => {
        return (
            featuredObtainedAchievement.data &&
            featuredObtainedAchievement.data.id === achievement.id
        );
    });
    return <Stack className={"w-full"}></Stack>;
};

export default PreferencesFeaturedAchievement;
