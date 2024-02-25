import React from "react";
import { BaseModalProps } from "@/util/types/modal-props";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CollectionsService } from "@/wrapper/server";
import useUserId from "@/components/auth/hooks/useUserId";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import { useCollection } from "@/components/collection/hooks/useCollection";
import { useCollectionEntriesForCollectionId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForCollectionId";
import { useRouter } from "next/router";

interface Props extends BaseModalProps {
    collectionId: string;
}

const CollectionRemoveModal = ({ collectionId, opened, onClose }: Props) => {
    const router = useRouter();
    const userId = useUserId();
    const queryClient = useQueryClient();
    const libraryQuery = useUserLibrary(userId);
    const collectionQuery = useCollection(collectionId);
    const collectionEntriesQuery = useCollectionEntriesForCollectionId({
        collectionId,
    });
    const collectionRemoveMutation = useMutation({
        mutationFn: (collectionId: string) => {
            return CollectionsService.collectionsControllerDelete(collectionId);
        },
        onSettled: () => {
            libraryQuery.invalidate();
            collectionQuery.invalidate();
            collectionEntriesQuery.invalidate();
            libraryQuery.invalidate();
        },
        onSuccess: () => {
            router.push(`/library/${userId}`);
        },
    });

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={"Remove collection"}
            centered
        >
            <Modal.Body>
                <Stack w={"100%"} justify={"center"}>
                    <Text fz={"xl"}>
                        Are you sure you want to remove this collection and all
                        metadata associated with it?
                    </Text>
                    <Text fw={"bold"}>
                        This will also remove all games from this collection. If
                        the games don't exist in other collections, your reviews
                        from them will also be removed.
                    </Text>
                    <Group wrap={"nowrap"} justify={"center"}>
                        <Button onClick={onClose} color={"blue"}>
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                collectionRemoveMutation.mutate(collectionId);
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

export default CollectionRemoveModal;
