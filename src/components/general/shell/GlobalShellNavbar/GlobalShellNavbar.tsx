import {
    TextInput,
    UnstyledButton,
    Text,
    rem,
    Transition,
    Center,
    Stack,
    ScrollArea,
    AppShell,
} from "@mantine/core";
import {
    IconBulb,
    IconUser,
    IconCheckbox,
    IconSearch,
    IconPlus,
    IconSelector,
} from "@tabler/icons-react";
import { UserButton } from "@/components/general/input/UserButton/UserButton";
import Link from "next/link";
import { serverUrl } from "@/util/constants";
import useUserInfo from "@/hooks/useUserInfo";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import GlobalShellNavbarCollectionsHeader from "@/components/general/shell/GlobalShellNavbar/GlobalShellNavbarCollectionsHeader";
import classes from "./global-shell-navbar.module.css";

const links = [
    { icon: IconBulb, label: "Activity", href: "/activity" },
    { icon: IconUser, label: "Library", href: "/library" },
    { icon: IconCheckbox, label: "Achievements", href: "/achievements" },
];

interface IGlobalShellNavbarProps {
    sidebarOpened: boolean;
}

export default function GlobalShellNavbar({
    sidebarOpened,
}: IGlobalShellNavbarProps) {
    const { userProfile, userLibrary } = useUserInfo();
    const session = useSessionContext();
    const isLoggedIn = !session.loading && session.doesSessionExist;

    const mainLinks = links.map((link) => (
        <UnstyledButton key={link.label} className={classes.mainLink}>
            <Link href={link.href} className={classes.mainLinkInner}>
                <link.icon
                    size={20}
                    className={classes.mainLinkIcon}
                    stroke={1.5}
                />
                <span>{link.label}</span>
            </Link>
        </UnstyledButton>
    ));

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

        return userLibrary.collections.map((collection) => (
            <Link
                key={collection.id}
                href={`/profile/collections/${collection.id}`}
                className={classes.collectionLink}
            >
                <span>{collection.name}</span>
            </Link>
        ));
    };

    const placeholderUserButtonImage = "https://i.imgur.com/fGxgcDF.png";

    const userAvatarImageUrl =
        userProfile && userProfile.avatar
            ? `${serverUrl}/public/uploads/${userProfile.avatar.path}${userProfile.avatar.extension}`
            : placeholderUserButtonImage;

    return (
        <nav className={classes.navbar} style={undefined}>
            {isLoggedIn && userProfile && (
                <div className={classes.section}>
                    <UserButton
                        image={userAvatarImageUrl}
                        username={userProfile.username}
                        description="Product owner"
                    />
                </div>
            )}

            <TextInput
                placeholder="Search"
                size="xs"
                leftSection={<IconSearch size="0.8rem" stroke={1.5} />}
                styles={{ section: { pointerEvents: "none" } }}
                mt={isLoggedIn ? 0 : "sm"}
                mb="sm"
            />

            <div className={classes.section}>
                <div className={classes.mainLinks}>{mainLinks}</div>
            </div>

            <div className={classes.section}>
                <GlobalShellNavbarCollectionsHeader />
                <ScrollArea>
                    <Stack className={classes.collections} gap="xs">
                        {buildCollectionsLinks()}
                    </Stack>
                </ScrollArea>
            </div>
        </nav>
    );
}
