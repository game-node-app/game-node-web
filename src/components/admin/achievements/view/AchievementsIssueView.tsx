import React, { useCallback, useState } from "react";
import { DetailsBox } from "@/components/general/DetailsBox";
import { useSearchUsers } from "@/components/profile/hooks/useSearchUsers";
import {
    Button,
    ComboboxItem,
    MultiSelect,
    Select,
    Stack,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useUserProfiles } from "@/components/profile/hooks/useUserProfiles";
import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import useUserId from "@/components/auth/hooks/useUserId";
import AchievementItem from "@/components/achievement/AchievementItem";
import { useMutation } from "@tanstack/react-query";
import { AchievementsService } from "@/wrapper/server";
import { notifications } from "@mantine/notifications";

const AchievementsIssueView = () => {
    const userId = useUserId();

    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const profilesQuery = useUserProfiles();

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

    const buildUserOptions = useCallback(() => {
        if (!profilesQuery.data) return [];

        return profilesQuery.data.map((profile): ComboboxItem => {
            return {
                value: profile.userId,
                label: profile.username,
            };
        });
    }, [profilesQuery.data]);

    const grantAchievementMutation = useMutation({
        mutationFn: async () => {
            if (!selectedAchievementId) {
                throw new Error("An achievement must be selected first.");
            } else if (selectedUserIds.length === 0) {
                throw new Error("At least one user must be selected.");
            }

            await AchievementsService.achievementsControllerGrantAchievements({
                achievementId: selectedAchievementId,
                targetUserIds: selectedUserIds,
            });
        },
        onError: (err) => {
            notifications.show({
                message: err.message,
                color: "red",
            });
        },
        onSuccess: () => {
            notifications.show({
                message:
                    "Successfully granted achievements to all selected users!",
                color: "green",
            });
        },
    });

    return (
        <DetailsBox
            title={"Issue achievements"}
            description={"Give users achievements directly"}
        >
            <Stack className={"w-full"}>
                <MultiSelect
                    label={"Select users"}
                    data={buildUserOptions()}
                    value={selectedUserIds}
                    onChange={(v) => {
                        if (v) {
                            setSelectedUserIds(v);
                        }
                    }}
                    searchable
                    limit={20}
                    withCheckIcon
                    nothingFoundMessage="Nothing found..."
                />
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
                <Button
                    className={"my-4"}
                    onClick={() => {
                        grantAchievementMutation.mutate();
                    }}
                    disabled={
                        selectedUserIds.length === 0 ||
                        !getSelectedAchievement()
                    }
                    loading={grantAchievementMutation.isPending}
                >
                    Grant achievement
                </Button>
            </Stack>
        </DetailsBox>
    );
};

export default AchievementsIssueView;
