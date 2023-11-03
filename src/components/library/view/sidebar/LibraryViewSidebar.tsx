import React from "react";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import classes from "../library-view-navbar.module.css";
import { IconSearch } from "@tabler/icons-react";
import { Box, Group, Space, Text, TextInput } from "@mantine/core";
import Link from "next/link";
import { Collection } from "@/wrapper";
import LibraryViewSidebarCollections from "@/components/library/view/sidebar/LibraryViewSidebarCollections";

interface ILibraryViewSidebarProps {
    userId: string | undefined;
}

const buildCollectionsItems = (collections: Collection[]) => {
    if (collections == undefined || collections.length === 0) {
        return null;
    }
};

const LibraryViewSidebar = ({ userId }: ILibraryViewSidebarProps) => {
    const userLibraryQuery = useUserLibrary(userId);
    const userLibrary = userLibraryQuery.data;
    return (
        <nav className={classes.navbar}>
            <div className={classes.section}>
                <Link href={`/library/${userId}`} className={classes.mainLink}>
                    <Text className="w-full" ta={"center"}>
                        Home
                    </Text>
                </Link>
            </div>
            <LibraryViewSidebarCollections library={userLibrary!} />
        </nav>
    );
};

export default LibraryViewSidebar;
