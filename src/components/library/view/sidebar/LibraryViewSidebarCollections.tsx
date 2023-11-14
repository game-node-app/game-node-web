import React from "react";
import { Library } from "@/wrapper/server";
import {
    Accordion,
    AccordionControlProps,
    ActionIcon,
    Center,
    ScrollArea,
    Text,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import classes from "@/components/library/view/library-view-navbar.module.css";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import CollectionCreateOrUpdateModal from "@/components/collection/form/modal/CollectionCreateOrUpdateModal";

interface ILibraryViewSidebarCollectionsProps {
    library: Library | undefined;
}

function CollectionsAccordionControl({
    children,
    ...others
}: AccordionControlProps) {
    const [opened, { open, close }] = useDisclosure();
    return (
        <Center>
            <CollectionCreateOrUpdateModal opened={opened} onClose={close} />
            <Accordion.Control {...others} pr={0}>
                {children}
            </Accordion.Control>
            <ActionIcon size="lg" variant="subtle" color="gray" onClick={open}>
                <IconPlus size="1rem" />
            </ActionIcon>
        </Center>
    );
}

const LibraryViewSidebarCollections = ({
    library,
}: ILibraryViewSidebarCollectionsProps) => {
    if (!library || !library.collections || library.collections.length === 0) {
        // TODO: Add fallback component
        return null;
    }

    const buildCollectionsItems = () => {
        const userId = library.userId;
        return library.collections.map((collection) => {
            return (
                <Link
                    key={collection.id}
                    href={`/library/${userId}/collection/${collection.id}`}
                    className={classes.mainLink}
                >
                    <Text className="w-full" ta={"center"}>
                        {collection.name}
                    </Text>
                </Link>
            );
        });
    };

    const buildFeaturedCollectionsItems = () => {
        const userId = library.userId;
        const featuredCollections = library.collections.filter(
            (collection) => collection.isFeatured,
        );
        return featuredCollections.map((collection) => {
            return (
                <Link
                    key={collection.id}
                    href={`/library/${userId}/collection/${collection.id}`}
                    className={classes.mainLink}
                >
                    <Text className="w-full" ta={"center"}>
                        {collection.name}
                    </Text>
                </Link>
            );
        });
    };

    return (
        <>
            <div className={classes.section}>
                <Accordion variant={"default"} chevronPosition={"left"}>
                    <Accordion.Item value={"collections"}>
                        <CollectionsAccordionControl>
                            Collections
                        </CollectionsAccordionControl>
                        <Accordion.Panel>
                            <ScrollArea.Autosize mah={200}>
                                {buildCollectionsItems()}
                            </ScrollArea.Autosize>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>
            <div className={classes.section}>
                {buildFeaturedCollectionsItems()}
            </div>
        </>
    );
};

export default LibraryViewSidebarCollections;
