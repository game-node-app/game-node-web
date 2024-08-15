import React, { useCallback, useState } from "react";
import {
    Button,
    ComboboxItem,
    Paper,
    Select,
    Stack,
    Text,
} from "@mantine/core";
import { DetailsBox } from "@/components/general/DetailsBox";
import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import AchievementItem from "@/components/achievement/AchievementItem";
import useUserId from "@/components/auth/hooks/useUserId";
import { useMutation } from "@tanstack/react-query";
import { AchievementsCodeService } from "@/wrapper/server";
import { notifications } from "@mantine/notifications";

const AchievementsGenerateCodeView = () => {
    const userId = useUserId();

    const [generatedAchievementCode, setGeneratedAchievementCode] = useState<
        string | undefined
    >(undefined);

    const [selectedAchievementId, setSelectedAchievementId] = useState<
        string | undefined
    >(undefined);
    const achievementsQuery = useAchievements({});

    const buildAchievementsOptions = useCallback((): ComboboxItem[] => {
        if (!achievementsQuery.data) return [];

        return achievementsQuery.data.data.map((achievement): ComboboxItem => {
            return {
                value: achievement.id,
                label: achievement.name,
            };
        });
    }, [achievementsQuery.data]);

    const getSelectedAchievement = useCallback(() => {
        if (!achievementsQuery.data || !selectedAchievementId) return undefined;

        return achievementsQuery.data?.data.find(
            (achievement) => achievement.id === selectedAchievementId,
        );
    }, [achievementsQuery.data, selectedAchievementId]);

    const generateCodeMutation = useMutation({
        mutationFn: async () => {
            if (!selectedAchievementId) {
                throw new Error("A achievement must be selected first.");
            }

            const threeDaysFromNow = new Date();
            threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);

            const resp =
                await AchievementsCodeService.achievementsCodeControllerGenerate(
                    {
                        achievementId: selectedAchievementId,
                        expiresAt: threeDaysFromNow.toISOString(),
                    },
                );

            console.log("Generated achievement code: ", resp);

            setGeneratedAchievementCode(resp.code);

            return resp;
        },

        onError: (err) => {
            notifications.show({
                message: err.message,
                color: "red",
            });
        },

        onSuccess: (data) => {
            notifications.show({
                message:
                    "Successfully generated code! Make sure to write it down, as it will not be shown again.",
                color: "green",
                autoClose: 15000,
            });
        },
    });

    return (
        <DetailsBox
            title={"Generate achievement code"}
            description={
                "This code can be used by users to automatically receive an achievement"
            }
        >
            <Stack className={"w-full h-full items-center"}>
                <Select
                    value={selectedAchievementId}
                    onChange={(v) => {
                        if (v) {
                            setSelectedAchievementId(v);
                        }
                    }}
                    label={"Select a achievement"}
                    description={
                        "You can search by typing a achievement's name"
                    }
                    className={"w-full"}
                    data={buildAchievementsOptions()}
                    searchable
                    clearable={false}
                    withCheckIcon
                />
                {userId && getSelectedAchievement() && (
                    <AchievementItem
                        targetUserId={userId}
                        achievement={getSelectedAchievement()}
                    />
                )}

                {getSelectedAchievement() && (
                    <Button
                        className={"my-4"}
                        onClick={() => {
                            generateCodeMutation.mutate();
                        }}
                        disabled={generateCodeMutation.isPending}
                    >
                        Generate code
                    </Button>
                )}

                {generatedAchievementCode && (
                    <Stack className={"w-full"}>
                        <Paper className={"bg-[#111111] py-6 px-12 w-full"}>
                            <Text className={"text-center text-xl"}>
                                {generatedAchievementCode}
                            </Text>
                        </Paper>
                        <Text className={"text-dimmed text-sm text-center"}>
                            Make sure to write it down, as it will not be shown
                            again. This code will expire in 3 days.
                        </Text>
                    </Stack>
                )}
            </Stack>
        </DetailsBox>
    );
};

export default AchievementsGenerateCodeView;
