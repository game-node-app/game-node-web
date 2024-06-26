import React, { useMemo } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
    Box,
    Group,
    Modal,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import useUserId from "@/components/auth/hooks/useUserId";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import { UserAvatar } from "@/components/general/input/UserAvatar";
import UserLevelInfo from "@/components/user-level/UserLevelInfo";
import PreferencesAvatarUploader from "@/components/preferences/handlers/PreferencesAvatarUploader";
import PreferencesUsernameChanger from "@/components/preferences/handlers/PreferencesUsernameChanger";
import Link from "next/link";
import PreferencesFeaturedAchievement from "@/components/preferences/handlers/PreferencesFeaturedAchievement";
import CenteredLoading from "@/components/general/CenteredLoading";
import { useAllObtainedAchievements } from "@/components/achievement/hooks/useAllObtainedAchievements";
import { DetailsBox } from "@/components/general/DetailsBox";
import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import AchievementLogo from "@/components/achievement/AchievementLogo";
import PreferencesBioForm from "@/components/preferences/handlers/PreferencesBioForm";
import useOnMobile from "@/components/general/hooks/useOnMobile";

const PreferencesProfileScreen = () => {
    const onMobile = useOnMobile();
    const userId = useUserId();
    const userProfile = useUserProfile(userId);
    const [avatarModalOpened, avatarModalOpenedUtils] = useDisclosure();
    const [usernameModalOpened, usernameModalUtils] = useDisclosure();
    const obtainedAchievements = useAllObtainedAchievements(userId);
    const sortedObtainedAchievements = useMemo(() => {
        if (obtainedAchievements.data == undefined) return undefined;
        return obtainedAchievements.data.toSorted((a, b) => {
            const aCreateDate = new Date(a.createdAt);
            const bCreateDate = new Date(b.createdAt);
            return aCreateDate.getTime() - bCreateDate.getTime();
        });
    }, [obtainedAchievements.data]);

    const hasObtainedAchievements =
        obtainedAchievements.data != undefined &&
        obtainedAchievements.data.length > 0;

    if (userProfile.isLoading) {
        return <CenteredLoading />;
    }
    return (
        <Stack w={"100%"} className={"items-center"}>
            <Group
                wrap={"wrap"}
                className={"w-full items-start justify-between wrap px-4"}
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
                        withCloseButton={false}
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
                                userId={userId}
                                className={
                                    "relative w-[152px] lg:w-[92px] h-[152px] lg:h-[92px]"
                                }
                            />
                        </Box>

                        <Stack>
                            <Link href={"#"} onClick={usernameModalUtils.open}>
                                <Title
                                    size={"h4"}
                                    className={"text-center lg:text-start"}
                                >
                                    {userProfile.data?.username}
                                </Title>
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
            <DetailsBox
                title={"Achievements"}
                description={
                    "Your recent obtained achievements will show here."
                }
            >
                <Link href={`/achievements/${userId}`} className={"w-full"}>
                    <Group
                        justify={hasObtainedAchievements ? "center" : "start"}
                    >
                        {sortedObtainedAchievements?.map((achievement) => {
                            if (!achievement) return null;
                            return (
                                <AchievementLogo
                                    key={achievement.id}
                                    achievementId={achievement.achievementId}
                                />
                            );
                        })}
                        {!hasObtainedAchievements && (
                            <Text>None, for now ;)</Text>
                        )}
                    </Group>
                </Link>
            </DetailsBox>
            <DetailsBox title={"Bio"}>
                <PreferencesBioForm />
            </DetailsBox>
            {onMobile && (
                <Box w={"100%"} mt={"1rem"} mb={"1rem"}>
                    <Link href={"/auth/logout"}>
                        <Text className={"text-center"} c={"dimmed"}>
                            Log out
                        </Text>
                    </Link>
                </Box>
            )}
        </Stack>
    );
};

export default PreferencesProfileScreen;
