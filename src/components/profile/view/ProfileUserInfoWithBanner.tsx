import React, { PropsWithChildren } from "react";
import ProfileBanner from "@/components/profile/view/ProfileBanner";
import {
    ActionIcon,
    AspectRatio,
    Box,
    Divider,
    Group,
    Modal,
    Overlay,
    Stack,
    Text,
} from "@mantine/core";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import ProfileUserInfo from "@/components/profile/view/ProfileUserInfo";
import ProfileViewNavbar from "@/components/profile/view/ProfileViewNavbar";
import ProfileFavoriteGames from "@/components/profile/view/ProfileFavoriteGames";
import RecentActivityList from "@/components/activity/RecentActivityList";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useUserId from "@/components/auth/hooks/useUserId";
import { IconEdit } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ProfileEditUsernameUpdate from "@/components/profile/edit/ProfileEditUsernameUpdate";
import ProfileEditAvatarUploader from "@/components/profile/edit/ProfileEditAvatarUploader";

/**
 * Allows a custom source to be passed to this component's images. For preview purposes only.
 */
interface PreviewCustomSources {
    avatar?: string;
    banner?: string;
}

interface ProfileUserInfoWithBannerProps extends PropsWithChildren {
    userId: string;
    showEditButtons?: boolean;
    customSources?: PreviewCustomSources;
}

/**
 * Wrapper component that renders both ProfileUserInfo and ProfileBanner. <br>
 * Also features edit modals for username and avatar.
 *
 * @constructor
 * @param userId - target user id
 * @param showEditButtons - if edit buttons should be shown
 * @param children - items to be rendered on the RIGHT side of the ProfileUserInfo component for desktop,
 * and BELOW it for mobile.
 */

const ProfileUserInfoWithBanner = ({
    userId,
    showEditButtons = false,
    customSources,
    children,
}: ProfileUserInfoWithBannerProps) => {
    const ownUserId = useUserId();
    const profileQuery = useUserProfile(userId);

    const [editUsernameModalOpen, editUsernameModalUtils] = useDisclosure();
    const [editAvatarModalOpen, editAvatarModalUtils] = useDisclosure();

    return (
        <Stack className={"w-full h-full gap-0 mt-3 mb-12"}>
            <Modal
                opened={editUsernameModalOpen}
                onClose={editUsernameModalUtils.close}
                size={"xl"}
                title={"Update username"}
            >
                <Modal.Body>
                    <ProfileEditUsernameUpdate
                        onClose={editUsernameModalUtils.close}
                    />
                </Modal.Body>
            </Modal>
            <Modal
                opened={editAvatarModalOpen}
                onClose={editAvatarModalUtils.close}
                size={"xl"}
                title={"Update profile picture"}
            >
                <Modal.Body>
                    <ProfileEditAvatarUploader
                        onClose={editAvatarModalUtils.close}
                    />
                </Modal.Body>
            </Modal>
            <ProfileBanner
                userId={userId}
                customSource={customSources?.banner}
                showEditButton={showEditButtons}
            />
            <Group
                className={
                    "w-full justify-start items-start flex-wrap lg:flex-nowrap"
                }
            >
                <Stack
                    className={
                        "w-full lg:w-1/5 lg:min-w-52 h-full bg-[#161616] gap-0 relative"
                    }
                >
                    <Stack className={"w-full items-center relative -top-20"}>
                        <Box className={"relative w-fit h-fit"}>
                            <UserAvatar
                                className={
                                    "relative border-[#161616] border-[7px]"
                                }
                                userId={userId}
                                size={"10rem"}
                            />
                            {showEditButtons && (
                                <ActionIcon
                                    size={"md"}
                                    variant="default"
                                    className={"absolute right-0 bottom-0 z-20"}
                                    onClick={editAvatarModalUtils.open}
                                >
                                    <IconEdit />
                                </ActionIcon>
                            )}
                        </Box>

                        <Group className={"items-center"}>
                            <Text className={""}>
                                {profileQuery.data?.username}
                            </Text>
                            {showEditButtons && (
                                <ActionIcon
                                    size={"md"}
                                    variant="default"
                                    onClick={editUsernameModalUtils.open}
                                >
                                    <IconEdit />
                                </ActionIcon>
                            )}
                        </Group>
                    </Stack>
                    <Stack className={"w-full h-full relative -top-14"}>
                        <ProfileUserInfo userId={userId} />
                    </Stack>
                </Stack>
                <Stack
                    className={
                        "lg:items-start w-full lg:w-4/5 p-1 lg:p-3 lg:mt-4"
                    }
                >
                    {children}
                </Stack>
            </Group>
        </Stack>
    );
};

export default ProfileUserInfoWithBanner;
