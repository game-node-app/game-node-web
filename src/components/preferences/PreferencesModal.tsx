import React from "react";
import { BaseModalProps } from "@/util/types/modal-props";
import { Modal } from "@mantine/core";
import PreferencesScreen from "@/components/preferences/PreferencesScreen";

interface Props extends BaseModalProps {}

const PreferencesModal = ({ onClose, opened }: Props) => {
    return (
        <Modal opened={opened} onClose={onClose} centered size={"90vw"}>
            <Modal.Body className={"w-full min-h-[90vh]"}>
                <PreferencesScreen />
            </Modal.Body>
        </Modal>
    );
};

export default PreferencesModal;
