import React, { useMemo } from "react";
import { BaseModalProps } from "@/util/types/modal-props";
import { UserConnection } from "@/wrapper/server";
import { Modal } from "@mantine/core";
import PreferencesConnectionSteamForm from "@/components/preferences/handlers/connections/steam/PreferencesConnectionSteamForm";
interface Props extends BaseModalProps {
    type: UserConnection.type;
}

const PreferencesConnectionModal = ({ opened, onClose, type }: Props) => {
    const renderedConnectionForm = useMemo(() => {
        switch (type) {
            case UserConnection.type.STEAM:
                return <PreferencesConnectionSteamForm onClose={onClose} />;
            default:
                return null;
        }
    }, [onClose, type]);
    return (
        <Modal title={"Set up connection"} onClose={onClose} opened={opened}>
            <Modal.Body>{renderedConnectionForm}</Modal.Body>
        </Modal>
    );
};

export default PreferencesConnectionModal;
