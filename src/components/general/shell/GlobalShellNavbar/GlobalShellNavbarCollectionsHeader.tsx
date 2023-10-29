import React from "react";
import { ActionIcon, Group, Modal, Text, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import CreateCollectionForm from "@/components/collection/form/CreateCollectionForm";
import { useDisclosure } from "@mantine/hooks";

const GlobalShellNavbarCollectionsHeader = () => {
    const [open, { toggle, close }] = useDisclosure(false);

    return (
        <Group className="px-md pb-md" justify={"apart"} wrap={"nowrap"}>
            <Modal
                title={"Create collection"}
                withCloseButton
                opened={open}
                onClose={() => close()}
            >
                <CreateCollectionForm
                    postSubmit={() => {
                        close();
                    }}
                />
            </Modal>
            <Text size="xs" w={500} c="dimmed" className="">
                Your collections
            </Text>
            <Tooltip label="Create collection" withArrow position="right">
                <ActionIcon
                    variant="default"
                    size={18}
                    onClick={() => toggle()}
                >
                    <IconPlus size="0.8rem" stroke={1.5} />
                </ActionIcon>
            </Tooltip>
        </Group>
    );
};

export default GlobalShellNavbarCollectionsHeader;
