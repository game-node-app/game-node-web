import React from "react";
import { BaseModalProps } from "@/util/types/modal-props";
import { Button, Center, Group, Modal, Stack, Text } from "@mantine/core";
import { useMutation, useQueryClient } from "react-query";
import { CollectionsEntriesService } from "@/wrapper/server";

interface ICollectionEntryRemoveModalProps extends BaseModalProps {
    id: number;
}

const CollectionEntryRemoveModal = ({
    id,
    onClose,
    opened,
}: ICollectionEntryRemoveModalProps) => {
    const queryClient = useQueryClient();
    const collectionEntryRemoveMutation = useMutation({
        mutationFn: (gameId: number) => {
            return CollectionsEntriesService.collectionsEntriesControllerDeleteOwnEntryByGameId(
                gameId,
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["collectionEntries", id]);
        },
    });

    return (
        <Modal opened={opened} onClose={onClose} title={"Remove game"} centered>
            <Modal.Body>
                <Stack justify={"center"} w={"100%"} ta={"center"}>
                    <Text fz={"lg"}>
                        You are about to <strong>remove</strong> this game and
                        any related data from your library.
                    </Text>
                    <Text c={"dimmed"} fz={"sm"}>
                        If you wish to <strong>move</strong> this game between
                        collections, you can use the Update option instead.
                    </Text>
                    <Text>Are you sure?</Text>
                    <Group wrap={"nowrap"} justify={"center"}>
                        <Button onClick={onClose} color={"blue"}>
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                collectionEntryRemoveMutation.mutate(id);
                                onClose();
                            }}
                            color={"red"}
                        >
                            Yes
                        </Button>
                    </Group>
                </Stack>
            </Modal.Body>
        </Modal>
    );
};

export default CollectionEntryRemoveModal;
