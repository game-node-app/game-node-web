import React from "react";
import {
    Box,
    Group,
    Paper,
    Stack,
    Image,
    Title,
    Text,
    Overlay,
} from "@mantine/core";
import { AchievementDto } from "@/wrapper/server";
import { useObtainedAchievement } from "@/components/achievement/hooks/useObtainedAchievement";
import { getServerStoredIcon } from "@/util/getServerStoredImages";

interface Props {
    targetUserId: string;
    achievement: AchievementDto;
}

const AchievementItem = ({ targetUserId, achievement }: Props) => {
    const obtainedAchievementQuery = useObtainedAchievement(
        targetUserId,
        achievement.id,
    );
    const obtainedAchievement = obtainedAchievementQuery.data;
    const achievementNotYetObtained = obtainedAchievement == undefined;

    const backgroundColor = achievementNotYetObtained
        ? "rgba(0,0,0,0.78)"
        : "linear-gradient(90deg, rgba(30,30,30,1) 0%, rgba(30,30,30,0.85) 100%)";

    const obtainedText = achievementNotYetObtained
        ? "Not yet obtained"
        : `Obtained at ${new Date(obtainedAchievement?.createdAt).toLocaleDateString()}`;
    return (
        <Paper
            className={"border-4 border-[#282828]"}
            w={"100%"}
            bg={backgroundColor}
            withBorder
            pos={"relative"}
        >
            <Group
                wrap={"nowrap"}
                w={"100%"}
                h={"100%"}
                px={"1rem"}
                py={"1.5rem"}
                opacity={achievementNotYetObtained ? "0.78" : "1"}
            >
                <Image
                    className="w-[48px] h-[48px]"
                    src={getServerStoredIcon(achievement.id)}
                    alt={achievement.name}
                />

                <Stack gap={"0.5rem"} w={"50%"}>
                    <Title fz={"1rem"}>{achievement.name}</Title>
                    <Text fz={"0.85rem"} className={"break-words"}>
                        {achievement.description}
                    </Text>
                </Stack>
                <Stack ml={"auto"} gap={0} justify={"center"} align={"center"}>
                    <Title fz={"1.5rem"}>{achievement.expGainAmount} XP</Title>
                    <Text fz={"0.5rem"}>{obtainedText}</Text>
                </Stack>
            </Group>
        </Paper>
    );
};

export default AchievementItem;
