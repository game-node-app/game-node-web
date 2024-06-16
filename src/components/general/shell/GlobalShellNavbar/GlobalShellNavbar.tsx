import { Box, TextInput, UnstyledButton } from "@mantine/core";
import {
    IconBulb,
    IconUser,
    IconCheckbox,
    IconRouteAltLeft,
    IconProps,
    IconUserShield,
} from "@tabler/icons-react";
import { UserButton } from "@/components/general/input/UserButton/UserButton";
import Link from "next/link";
import Session, {
    useSessionContext,
} from "supertokens-auth-react/recipe/session";
import classes from "./global-shell-navbar.module.css";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import GlobalShellNavbarCollections from "@/components/general/shell/GlobalShellNavbar/GlobalShellNavbarCollections";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import { ExoticComponent, PropsWithoutRef, useMemo, useState } from "react";
import GlobalNavbarSearchBar from "@/components/general/shell/GlobalShellNavbar/search-bar/GlobalShellNavbarSearchBar";
import { useUserRoles } from "@/components/auth/hooks/useUserRoles";
import { EUserRoles } from "@/components/auth/roles";

interface NavbarItem {
    icon: ExoticComponent<PropsWithoutRef<IconProps>>;
    label: string;
    href: string;
}

const IN_DEVELOPMENT_URL = "/503";

const links: NavbarItem[] = [
    { icon: IconRouteAltLeft, label: "Explore", href: "/explore" },
    { icon: IconUser, label: "Library", href: "/library" },
    { icon: IconCheckbox, label: "Achievements", href: "/achievements" },
    { icon: IconBulb, label: "Activity", href: "/activity" },
    // It's disabled during beta, if you are reading this you're cheating :p
    // { icon: IconRefresh, label: "Importer", href: "/importer" },
];

interface IGlobalShellNavbarProps extends BaseModalChildrenProps {}

export default function GlobalShellNavbar({
    onClose,
}: IGlobalShellNavbarProps) {
    const [query, setQuery] = useState<string>("");
    const session = useSessionContext();
    const isLoggedIn = !session.loading && session.doesSessionExist;
    const userProfileQuery = useUserProfile(
        session.loading ? undefined : session.userId,
    );

    const userRoles = useUserRoles();

    const hasAdminProjectAccess = useMemo(() => {
        return userRoles.some((role) => {
            return [
                EUserRoles.MOD.valueOf(),
                EUserRoles.ADMIN.valueOf(),
            ].includes(role);
        });
    }, [userRoles]);

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
                    <Link
                        href={`/profile/${userProfile.userId}`}
                        onClick={onClose}
                    >
                        <UserButton userId={userProfile.userId} />
                    </Link>
                </div>
            )}
            <Box w={"100%"} my={"0.8rem"}>
                <GlobalNavbarSearchBar
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
                <div className={classes.mainLinks}>
                    {mainLinks}
                    {hasAdminProjectAccess && (
                        <UnstyledButton className={classes.mainLink}>
                            <Link
                                href={"https://admin.gamenode.app"}
                                className={classes.mainLinkInner}
                                onClick={onClose}
                            >
                                <IconUserShield
                                    size={20}
                                    className={classes.mainLinkIcon}
                                    stroke={1.5}
                                />
                                <span>Admin</span>
                            </Link>
                        </UnstyledButton>
                    )}
                </div>
            </div>
            <GlobalShellNavbarCollections onClose={onClose} />
        </nav>
    );
}
