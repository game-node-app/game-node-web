import { Box, TextInput, UnstyledButton } from "@mantine/core";
import {
    IconBulb,
    IconUser,
    IconCheckbox,
    IconRouteAltLeft,
    TablerIconsProps,
    IconSettings,
} from "@tabler/icons-react";
import { UserButton } from "@/components/general/input/UserButton/UserButton";
import Link from "next/link";
import { serverUrl } from "@/util/constants";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import classes from "./global-shell-navbar.module.css";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import GlobalShellNavbarCollections from "@/components/general/shell/GlobalShellNavbar/GlobalShellNavbarCollections";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import { ReactElement, useState } from "react";
import SearchBarWithSelect from "@/components/general/input/SearchBar/SearchBarWithSelect";

interface NavbarItem {
    icon: (props: TablerIconsProps) => ReactElement;
    label: string;
    href: string;
}

const links: NavbarItem[] = [
    { icon: IconRouteAltLeft, label: "Explore", href: "/explore" },
    { icon: IconBulb, label: "Activity", href: "/activity" },
    { icon: IconUser, label: "Library", href: "/library" },
    { icon: IconCheckbox, label: "Achievements", href: "/achievements" },
    // { icon: IconSettings, label: "Preferences", href: "/preferences" },
];

interface IGlobalShellNavbarProps extends BaseModalChildrenProps {
    sidebarOpened: boolean;
}

export default function GlobalShellNavbar({
    sidebarOpened,
    onClose,
}: IGlobalShellNavbarProps) {
    const [query, setQuery] = useState<string>("");
    const session = useSessionContext();
    const isLoggedIn = !session.loading && session.doesSessionExist;
    const userProfileQuery = useUserProfile(
        session.loading ? undefined : session.userId,
    );

    const userProfile = userProfileQuery.data;

    const mainLinks = links.map((link) => (
        <UnstyledButton key={link.label} className={classes.mainLink}>
            <Link
                href={link.href}
                className={classes.mainLinkInner}
                onClick={onClose}
            >
                <link.icon
                    size={20}
                    className={classes.mainLinkIcon}
                    stroke={1.5}
                />
                <span>{link.label}</span>
            </Link>
        </UnstyledButton>
    ));

    return (
        <nav className={classes.navbar} style={undefined}>
            {isLoggedIn && userProfile && (
                <div className={classes.section}>
                    <Link href={`/profile/${userProfile.userId}`}>
                        <UserButton userId={userProfile.userId} />
                    </Link>
                </div>
            )}
            <Box w={"100%"} my={"0.8rem"}>
                <SearchBarWithSelect
                    withButton={false}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onOptionSubmit={(value, options, combobox) => {
                        /**
                         * Navigation is already handled by <Link> in the options components!
                         */
                        setQuery("");
                        combobox.closeDropdown();
                        if (onClose) onClose();
                    }}
                    onClear={() => setQuery("")}
                />
            </Box>

            <div className={classes.section}>
                <div className={classes.mainLinks}>{mainLinks}</div>
            </div>
            <GlobalShellNavbarCollections onClose={onClose} />
        </nav>
    );
}
