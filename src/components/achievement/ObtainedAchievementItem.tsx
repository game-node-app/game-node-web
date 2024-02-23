import React from "react";
import AchievementItem from "@/components/achievement/AchievementItem";
import { useAchievements } from "@/components/achievement/hooks/useAchievements";

interface Props {
    targetUserId: string;
    obtainedAchievementId: string;
}

const ObtainedAchievementItem = ({
    obtainedAchievementId,
    targetUserId,
}: Props) => {
    const achievementsQuery = useAchievements({});
    const achievementEntity = achievementsQuery.data?.data.find(
        (achievement) => achievement.id === obtainedAchievementId,
    );
    return (
        <AchievementItem
            targetUserId={targetUserId}
            achievement={achievementEntity}
        />
    );
};

export default ObtainedAchievementItem;
