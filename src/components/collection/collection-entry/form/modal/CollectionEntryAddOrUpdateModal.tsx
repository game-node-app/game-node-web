import React, { useEffect, useState } from "react";
import { Container, Modal } from "@mantine/core";
import LoginPromptCentered from "@/components/general/LoginPromptCentered";
import CollectionEntryAddOrUpdateForm from "@/components/collection/collection-entry/form/CollectionEntryAddOrUpdateForm";
import { BaseModalProps } from "@/util/types/modal-props";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import { useRouter } from "next/router";
import useOnMobile from "@/hooks/useOnMobile";

interface IGameAddModalProps extends BaseModalProps {
    id: number;
}

const CollectionEntryAddOrUpdateModal = ({
    opened,
    onClose,
    id,
}: IGameAddModalProps) => {
    const onMobile = useOnMobile();
    const router = useRouter();
    const session = useSessionContext();
    const userLibrary = useUserLibrary(
        session.loading ? undefined : session.userId,
    );

    useEffect(() => {
        if (!session.loading && !session.doesSessionExist && opened) {
            router.push("/auth");
        }
    }, [opened, router, session]);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={"Add to your library"}
            fullScreen={onMobile}
            transitionProps={{ transition: "fade", duration: 200 }}
        >
            <Modal.Body>
                {userLibrary.data ? (
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
