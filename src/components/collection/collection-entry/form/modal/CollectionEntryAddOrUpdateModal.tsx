import React, { useState } from "react";
import { Container, Modal } from "@mantine/core";
import useUserInfo from "@/hooks/useUserInfo";
import LoginPromptCentered from "@/components/general/LoginPromptCentered";
import CollectionEntryAddOrUpdateForm from "@/components/collection/collection-entry/form/CollectionEntryAddOrUpdateForm";
import { Game } from "@/wrapper";
import { BaseCollectionEntryModalProps } from "@/components/collection/collection-entry/form/types";

interface IGameAddModalProps extends BaseCollectionEntryModalProps {}

const CollectionEntryAddOrUpdateModal = ({
    opened,
    onClose,
    id,
}: IGameAddModalProps) => {
    const userInfo = useUserInfo();
    return (
        <Modal opened={opened} onClose={onClose} title={"Add to your library"}>
            <Modal.Body>
                {userInfo.userLibrary ? (
                    <Container fluid h={"100%"} className={""}>
                        <CollectionEntryAddOrUpdateForm
                            gameId={id}
                            onClose={onClose}
                        />
                    </Container>
                ) : (
                    <LoginPromptCentered />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default CollectionEntryAddOrUpdateModal;
