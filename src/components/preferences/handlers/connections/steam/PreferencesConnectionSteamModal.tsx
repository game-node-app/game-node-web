import React from "react";
import { Button, Modal, Stack, Text, TextInput } from "@mantine/core";
import { BaseModalProps } from "@/util/types/modal-props";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    ConnectionCreateDto,
    ConnectionsService,
    SteamSyncService,
} from "@/wrapper/server";
import { notifications } from "@mantine/notifications";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import { useOwnUserConnection } from "@/components/connections/hooks/useOwnUserConnection";
import type = ConnectionCreateDto.type;

interface Props extends BaseModalProps {}

const PreferencesConnectionSteamModal = ({ onClose, opened }: Props) => {
    const { watch, register, handleSubmit } = useForm<{
        query: string;
    }>({
        mode: "onSubmit",
    });

    const userConnection = useOwnUserConnection(type.STEAM);

    const queryClient = useQueryClient();

    const connectionCreateMutation = useMutation({
        mutationFn: async (query: string) => {
            try {
                const userInfo =
                    await SteamSyncService.steamSyncControllerResolveUserId({
                        query: query,
                    });
                await ConnectionsService.connectionsControllerCreateOrUpdate({
                    type: type.STEAM,
                    sourceUserId: userInfo.userId,
                    sourceUsername: userInfo.username,
                });
            } catch (err) {
                throw new Error("Invalid profile URL, please try again.");
            }
        },
        onSuccess: () => {
            notifications.show({
                color: "green",
                message: "Successfully set up Steam connection!",
            });
            onClose();
        },
        onSettled: () => {
            queryClient.resetQueries({
                queryKey: ["connections"],
            });
        },
    });

    const connectionDeleteMutation = useMutation({
        mutationFn: async () => {
            if (userConnection.data == undefined) {
                return;
            }
            console.log("Starts");
            return ConnectionsService.connectionsControllerDelete(
                userConnection.data.id,
            );
        },
        onSuccess: () => {
            notifications.show({
                color: "green",
                message: "Successfully removed Steam connection!",
            });
            onClose();
        },
        onSettled: () => {
            queryClient.resetQueries({
                queryKey: ["connections"],
            });
        },
    });

    return (
        <Modal title={"Set up connection"} onClose={onClose} opened={opened}>
            <Modal.Body>
                <form
                    className={"w-full h-full"}
                    onSubmit={handleSubmit((data) => {
                        connectionCreateMutation.mutate(data.query);
                    })}
                >
                    <Stack className={"w-full h-full"}>
                        {connectionCreateMutation.error && (
                            <CenteredErrorMessage
                                message={connectionCreateMutation.error.message}
                            />
                        )}
                        <TextInput
                            label={"Your public Steam profile url"}
                            description={
                                "e.g.: https://steamcommunity.com/id/your-username/"
                            }
                            defaultValue={userConnection.data?.sourceUsername}
                            {...register("query")}
                        />
                        <Text className={"text-sm"} c={"dimmed"}>
                            This connection can optionally be used in our
                            importer system to help you import games from this
                            store. This feature only works for public libraries.
                        </Text>
                        <Button
                            type={"submit"}
                            loading={connectionCreateMutation.isPending}
                        >
                            Submit
                        </Button>
                        {userConnection.data != undefined && (
                            <Button
                                color={"blue"}
                                type={"button"}
                                loading={connectionDeleteMutation.isPending}
                                onClick={() => {
                                    connectionDeleteMutation.mutate();
                                }}
                            >
                                Disconnect
                            </Button>
                        )}
                    </Stack>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default PreferencesConnectionSteamModal;
