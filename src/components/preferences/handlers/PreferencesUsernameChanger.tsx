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
            if (onClose) onClose();
        },
    });

    const checkBlockedFromUpdating = useCallback(() => {
        // TODO: Implement this check

        return false;
    }, []);

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const formData = new FormData(evt.currentTarget);
        const username = formData.get("username");
        if (!username) return;
        profileMutation.mutate(username as string);
    };

    return (
        <form className={"w-full h-full"} onSubmit={handleSubmit}>
            {checkBlockedFromUpdating() && (
                <Text c={"red"} mb={"2rem"}>
                    You have updated your username in the last 30 days and can't
                    update it yet.
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
                    disabled={checkBlockedFromUpdating()}
                />

                <Button
                    loading={true}
                    type={"submit"}
                    disabled={checkBlockedFromUpdating()}
                >
                    Submit
                </Button>
            </Stack>
        </form>
    );
};

export default PreferencesUsernameChanger;
