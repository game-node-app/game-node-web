import React, {
    FormEvent,
    FormEventHandler,
    useCallback,
    useMemo,
} from "react";
import useUserId from "@/components/auth/hooks/useUserId";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { Button, Stack, Text, TextInput, Title } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { ProfileService } from "@/wrapper/server";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import { notifications } from "@mantine/notifications";

interface Props extends BaseModalChildrenProps {}

const PreferencesUsernameChanger = ({ onClose }: Props) => {
    const userId = useUserId();
    const profile = useUserProfile(userId);
    const profileMutation = useMutation({
        mutationFn: async (username: string) => {
            return ProfileService.profileControllerUpdate({
                username,
            });
        },
        onSuccess: () => {
            profile.invalidate();
            notifications.show({
                color: "green",
                message: "Your username has been updated!",
            });
            if (onClose) onClose();
        },
    });

    const canUpdate: boolean = useMemo(() => {
        if (profile.data == undefined) return false;
        if (profile.data.usernameLastUpdatedAt == undefined) return true;
        const usernameUpdateDate = new Date(profile.data.usernameLastUpdatedAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(-30);
        return usernameUpdateDate.getTime() >= thirtyDaysAgo.getTime();
    }, [profile.data]);

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        const username = formData.get("username");
        if (!username) return;
        profileMutation.mutate(username as string);
    };

    return (
        <form className={"w-full h-full"} onSubmit={handleSubmit}>
            {!canUpdate && (
                <Text c={"red"}>
                    You have updated your username in the last 30 days. Please
                    try again later.
                </Text>
            )}
            {profileMutation.isError && (
                <Text c={"red"}>{profileMutation.error.message}</Text>
            )}
            <Stack className={"w-full items-center"}>
                <TextInput
                    label={"Select a new username"}
                    name={"username"}
                    id={"username"}
                    required
                    description={
                        "It must be unique and have at least five characters."
                    }
                    minLength={5}
                    defaultValue={profile.data?.username}
                />

                <Button
                    loading={profileMutation.isPending}
                    type={"submit"}
                    disabled={!canUpdate || profileMutation.isPending}
                >
                    Submit
                </Button>
            </Stack>
        </form>
    );
};

export default PreferencesUsernameChanger;
