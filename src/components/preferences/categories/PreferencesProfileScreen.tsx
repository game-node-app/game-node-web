import React, { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
    Box,
    Button,
    Center,
    Group,
    Modal,
    Overlay,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import useUserId from "@/components/auth/hooks/useUserId";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import UserLevelInfo from "@/components/user-level/UserLevelInfo";
import PreferencesAvatarUploader from "@/components/preferences/handlers/PreferencesAvatarUploader";
import { IconEdit } from "@tabler/icons-react";
import PreferencesUsernameChanger from "@/components/preferences/handlers/PreferencesUsernameChanger";
import Link from "next/link";
import { useFeaturedObtainedAchievement } from "@/components/achievement/hooks/useFeaturedObtainedAchievement";
import AchievementItem from "@/components/achievement/AchievementItem";
import PreferencesFeaturedAchievement from "@/components/preferences/handlers/PreferencesFeaturedAchievement";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import CenteredLoading from "@/components/general/CenteredLoading";

const PreferencesProfileScreen = () => {
    const userId = useUserId();
    const userProfile = useUserProfile(userId);
    const [avatarModalOpened, avatarModalOpenedUtils] = useDisclosure();
    const [usernameModalOpened, usernameModalUtils] = useDisclosure();
    if (userProfile.isLoading) {
        return <CenteredLoading />;
    }
    return (
        <Stack w={"100%"} className={"items-center"}>
            <Group
                wrap={"wrap"}
                className={"w-full items-start justify-between h-56 wrap"}
            >
                <Stack className={"w-full lg:w-6/12 justify-start mt-4"}>
                    <Modal
                        opened={avatarModalOpened}
                        onClose={avatarModalOpenedUtils.close}
                        size={"xl"}
                    >
                        <Modal.Body>
                            <PreferencesAvatarUploader
                                onClose={avatarModalOpenedUtils.close}
                            />
                        </Modal.Body>
                    </Modal>
                    <Modal
                        opened={usernameModalOpened}
                        onClose={usernameModalUtils.close}
                        size={"xl"}
                    >
                        <Modal.Body>
                            <PreferencesUsernameChanger
                                onClose={usernameModalUtils.close}
                            />
                        </Modal.Body>
                    </Modal>
                    <Group className={"justify-center lg:justify-start"}>
                        <Box
                            onClick={avatarModalOpenedUtils.open}
                            className={"relative"}
                        >
                            <UserAvatar
                                avatar={userProfile.data?.avatar}
                                className={
                                    "relative w-[152px] lg:w-[92px] h-[152px] lg:h-[92px]"
                                }
                            />
                        </Box>

                        <Stack>
                            <Link href={"#"} onClick={usernameModalUtils.open}>
                                <Group className={"relative"}>
                                    <Title size={"h4"}>
                                        {userProfile.data?.username}
                                    </Title>
                                </Group>
                            </Link>
                            {userId && <UserLevelInfo targetUserId={userId} />}
                        </Stack>
                    </Group>
                    <Text
                        c={"dimmed"}
                        className={"text-center lg:text-start text-sm"}
                    >
                        Click on your profile picture, username or featured
                        achievement to edit it.
                    </Text>
                </Stack>
                <Box className={"w-full lg:w-5/12"}>
                    <PreferencesFeaturedAchievement />
                </Box>
            </Group>
        </Stack>
    );
};

export default PreferencesProfileScreen;
