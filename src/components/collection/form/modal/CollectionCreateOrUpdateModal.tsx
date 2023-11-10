import React, { useEffect } from "react";
import { BaseModalProps } from "@/util/types/modal-props";
import CollectionCreateOrUpdateForm from "@/components/collection/form/CollectionCreateOrUpdateForm";
import { Modal } from "@mantine/core";
import { useCollection } from "@/components/collection/hooks/useCollection";

interface ICreateCollectionModalProps extends BaseModalProps {
    existingCollectionId?: string;
}

const CollectionCreateOrUpdateModal = ({
    opened,
    onClose,
    existingCollectionId,
}: ICreateCollectionModalProps) => {
    return (
        <Modal
            title={`${existingCollectionId ? "Update" : "Create"} collection`}
            withCloseButton
            opened={opened}
            onClose={() => onClose()}
        >
            <CollectionCreateOrUpdateForm
                onClose={onClose}
                existingCollectionId={existingCollectionId}
            />
        </Modal>
    );
};

export default CollectionCreateOrUpdateModal;
