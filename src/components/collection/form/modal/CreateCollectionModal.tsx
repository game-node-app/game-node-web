import React, { useEffect } from "react";
import { BaseModalProps } from "@/util/types/modal-props";
import CreateCollectionForm from "@/components/collection/form/CreateCollectionForm";
import { Modal } from "@mantine/core";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useRouter } from "next/router";

interface ICreateCollectionModalProps extends BaseModalProps {}

const CreateCollectionModal = ({
    opened,
    onClose,
}: ICreateCollectionModalProps) => {
    const session = useSessionContext();
    const router = useRouter();
    useEffect(() => {
        if (!session.loading && !session.doesSessionExist && opened) {
            onClose();
            router.push("/auth");
        }
    }, [onClose, opened, router, session]);
    return (
        <Modal
            title={"Create collection"}
            withCloseButton
            opened={opened}
            onClose={() => onClose()}
        >
            <CreateCollectionForm onClose={onClose} />
        </Modal>
    );
};

export default CreateCollectionModal;
