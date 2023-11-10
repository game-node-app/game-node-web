import React from "react";
import classes from "./global-shell-navbar.module.css";
import GlobalShellNavbarCollectionsHeader from "@/components/general/shell/GlobalShellNavbar/GlobalShellNavbarCollectionsHeader";
import { Center, ScrollArea, Stack, Text } from "@mantine/core";
import { Collection } from "@/wrapper/server";
import Link from "next/link";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const GlobalShellNavbarCollections = () => {
    const pathname = usePathname();

    const session = useSessionContext();
    const isLoggedIn = !session.loading && session.doesSessionExist;

    const userLibraryQuery = useUserLibrary(
        session.loading ? undefined : session.userId,
    );
    const userLibrary = userLibraryQuery.data;

    const shouldBeHidden = pathname && pathname.startsWith("/library");

    const buildCollectionsLinks = () => {
        if (
            !isLoggedIn ||
            !userLibrary ||
            userLibrary.collections == null ||
            userLibrary.collections.length === 0
        ) {
            return (
                <Center>
                    <Text c="dimmed" size="sm" mt="md">
                        Your collections will show here 😉
                    </Text>
                </Center>
            );
        }

        return userLibrary.collections.map((collection: Collection) => (
            <Link
                key={collection.id}
                href={`/library/${userLibrary.userId}/collection/${collection.id}`}
                className={classes.collectionLink}
            >
                <span>{collection.name}</span>
            </Link>
        ));
    };

    return (
        <div
            className={classes.section}
            style={{ display: shouldBeHidden ? "none" : "unset" }}
        >
            <GlobalShellNavbarCollectionsHeader />
            <ScrollArea>
                <Stack className={classes.collections} gap="xs">
                    {buildCollectionsLinks()}
                </Stack>
            </ScrollArea>
        </div>
    );
};

export default GlobalShellNavbarCollections;
