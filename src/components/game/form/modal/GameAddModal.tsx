import React, { useState } from "react";
import { Container, Modal } from "@mantine/core";
import useUserInfo from "@/hooks/useUserInfo";
import LoginPromptCentered from "@/components/general/LoginPromptCentered";
import GameAddForm from "@/components/game/form/GameAddForm";
import { Game } from "@/wrapper";

interface IGameAddModalProps {
    opened: boolean;
    onClose: () => void;
    metadata: Game;
}

const GameAddModal = ({ opened, onClose, metadata }: IGameAddModalProps) => {
    const userInfo = useUserInfo();
    return (
        <Modal opened={opened} onClose={onClose} title={"Add to your library"}>
            <Modal.Body>
                {userInfo.userLibrary ? (
                    <Container
                        fluid
                        h={"100%"}
                        className={"bg-mobile bg-cover bg-fixed"}
                    >
                        <GameAddForm metadata={metadata} />
                    </Container>
                ) : (
                    <LoginPromptCentered />
                )}
            </Modal.Body>
        </Modal>
    );
};

export default GameAddModal;
