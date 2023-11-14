import React, { useMemo } from "react";
import { useCollection } from "@/components/collection/hooks/useCollection";
import { ComboboxData, ComboboxItem, Select, SelectProps } from "@mantine/core";
import { Library } from "@/wrapper/server";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";

interface Props extends SelectProps {
    userId: string | undefined;
}

const LibraryViewCollectionsSelect = ({ userId, ...others }: Props) => {
    const libraryQuery = useUserLibrary(userId);
    const collectionOptions = useMemo<ComboboxItem[] | undefined>(() => {
        const collections = libraryQuery.data?.collections;
        if (collections == undefined || collections.length === 0)
            return undefined;

        return collections.map((collection) => ({
            value: collection.id,
            label: collection.name,
        }));
    }, [libraryQuery.data?.collections]);
    return (
        <Select
            w={"100%"}
            placeholder={"Select a collection"}
            searchable
            clearable
            data={collectionOptions}
            limit={10}
            {...others}
        />
    );
};

export default LibraryViewCollectionsSelect;
