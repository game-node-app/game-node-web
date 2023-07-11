import {
    createStyles,
    Navbar,
    TextInput,
    UnstyledButton,
    Text,
    rem,
    Transition,
    Center,
    Stack,
    ScrollArea,
} from "@mantine/core";
import {
    IconBulb,
    IconUser,
    IconCheckbox,
    IconSearch,
    IconPlus,
    IconSelector,
} from "@tabler/icons-react";
import UserButton from "@/components/general/input/UserButton";
import Link from "next/link";
import { serverUrl } from "@/util/constants";
import useUserInfo from "@/hooks/useUserInfo";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import GlobalShellNavbarCollectionsHeader from "@/components/general/shell/navbar/GlobalShellNavbarCollectionsHeader";

const useStyles = createStyles((theme) => ({
    navbar: {
        paddingTop: 0,
    },

    section: {
        marginLeft: `calc(${theme.spacing.md} * -1)`,
        marginRight: `calc(${theme.spacing.md} * -1)`,
        marginBottom: theme.spacing.md,

        "&:not(:last-of-type)": {
            borderBottom: `${rem(1)} solid ${
                theme.colorScheme === "dark"
                    ? theme.colors.dark[4]
                    : theme.colors.gray[3]
            }`,
        },
    },

    searchCode: {
        fontWeight: 700,
        fontSize: rem(10),
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
        border: `${rem(1)} solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[2]
        }`,
    },

    mainLinks: {
        paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
        paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
        paddingBottom: theme.spacing.md,
    },

    mainLink: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        fontSize: theme.fontSizes.xs,
        padding: `${rem(8)} ${theme.spacing.xs}`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },

    mainLinkInner: {
        display: "flex",
        alignItems: "center",
        flex: 1,
    },

    mainLinkIcon: {
        marginRight: theme.spacing.sm,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[2]
                : theme.colors.gray[6],
    },

    mainLinkBadge: {
        padding: 0,
        width: rem(20),
        height: rem(20),
        pointerEvents: "none",
    },

    collections: {
        paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
        paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
        paddingBottom: theme.spacing.md,
    },

    collectionsHeader: {
        paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
        paddingRight: theme.spacing.md,
        marginBottom: rem(5),
    },

    collectionLink: {
        display: "block",
        padding: `${rem(8)} ${theme.spacing.xs}`,
        textDecoration: "none",
        borderRadius: theme.radius.sm,
        fontSize: theme.fontSizes.xs,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        lineHeight: 1,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },
}));

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
    const { classes } = useStyles();
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
                    <Text color="dimmed" size="sm" mt="md">
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

    return (
        <Transition transition={"slide-right"} mounted={sidebarOpened}>
            {(transitionStyles) => {
                return (
                    <Navbar
                        style={transitionStyles}
                        width={{ sm: 200, lg: 300 }}
                        p="md"
                        hiddenBreakpoint="xl"
                        hidden={!sidebarOpened}
                        h={"100%"}
                    >
                        {isLoggedIn && userProfile && (
                            <Navbar.Section className={classes.section}>
                                <UserButton
                                    image={
                                        userProfile.avatar
                                            ? `${serverUrl}/public/uploads/${userProfile.avatar.path}${userProfile.avatar.extension}`
                                            : placeholderUserButtonImage
                                    }
                                    username={userProfile.username}
                                    description="Product owner"
                                />
                            </Navbar.Section>
                        )}

                        <TextInput
                            placeholder="Search"
                            size="xs"
                            icon={<IconSearch size="0.8rem" stroke={1.5} />}
                            mb="sm"
                        />

                        <Navbar.Section className={classes.section}>
                            <div className={classes.mainLinks}>{mainLinks}</div>
                        </Navbar.Section>

                        <Navbar.Section className={classes.section}>
                            <GlobalShellNavbarCollectionsHeader />
                            <ScrollArea>
                                <Stack
                                    className={classes.collections}
                                    spacing="xs"
                                >
                                    {buildCollectionsLinks()}
                                </Stack>
                            </ScrollArea>
                        </Navbar.Section>
                    </Navbar>
                );
            }}
        </Transition>
    );
}
