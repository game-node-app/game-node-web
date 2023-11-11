import { TextInput, UnstyledButton } from "@mantine/core";
import {
    IconBulb,
    IconUser,
    IconCheckbox,
    IconSearch,
} from "@tabler/icons-react";
import { UserButton } from "@/components/general/input/UserButton/UserButton";
import Link from "next/link";
import { serverUrl } from "@/util/constants";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import GlobalShellNavbarCollectionsHeader from "@/components/general/shell/GlobalShellNavbar/GlobalShellNavbarCollectionsHeader";
import classes from "./global-shell-navbar.module.css";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import GlobalShellNavbarCollections from "@/components/general/shell/GlobalShellNavbar/GlobalShellNavbarCollections";
import { BaseModalChildrenProps } from "@/util/types/modal-props";

const links = [
    { icon: IconBulb, label: "Activity", href: "/activity" },
    { icon: IconUser, label: "Library", href: "/library" },
    { icon: IconCheckbox, label: "Achievements", href: "/achievements" },
];

interface IGlobalShellNavbarProps extends BaseModalChildrenProps {
    sidebarOpened: boolean;
}

export default function GlobalShellNavbar({
    sidebarOpened,
    onClose,
}: IGlobalShellNavbarProps) {
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
            <GlobalShellNavbarCollections onClose={onClose} />
        </nav>
    );
}
