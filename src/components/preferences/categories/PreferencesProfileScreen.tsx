import React, { useEffect, useMemo, useRef } from "react";
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
import ProfileEditAvatarUploader from "@/components/profile/edit/ProfileEditAvatarUploader";
import ProfileEditUsernameUpdate from "@/components/profile/edit/ProfileEditUsernameUpdate";
import Link from "next/link";
import PreferencesFeaturedAchievement from "@/components/preferences/handlers/profile/PreferencesFeaturedAchievement";
import CenteredLoading from "@/components/general/CenteredLoading";
import { useAllObtainedAchievements } from "@/components/achievement/hooks/useAllObtainedAchievements";
import { DetailsBox } from "@/components/general/DetailsBox";
import { useAchievements } from "@/components/achievement/hooks/useAchievements";
import AchievementLogo from "@/components/achievement/AchievementLogo";
import PreferencesBioForm from "@/components/preferences/handlers/profile/PreferencesBioForm";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useRouter } from "next/router";
import { PreferencesQuickOpenActions } from "@/components/preferences/constants";

const PreferencesProfileScreen = () => {
    const onMobile = useOnMobile();
    const userId = useUserId();
    const userProfile = useUserProfile(userId);
    const router = useRouter();
    const { quickOpen } = router.query;
    const hasLoadedQueryParameters = useRef<boolean>(false);
    const [avatarModalOpened, avatarModalUtils] = useDisclosure();
    const [usernameModalOpened, usernameModalUtils] = useDisclosure();
    const [bannerModalOpened, bannerModalUtils] = useDisclosure();

    const obtainedAchievements = useAllObtainedAchievements(userId, true);

    const hasObtainedAchievements =
        obtainedAchievements.data != undefined &&
        obtainedAchievements.data.length > 0;

    /**
     * Effect to sync edit modals with the quickOpen query parameter
     */
    useEffect(() => {
        if (
            !hasLoadedQueryParameters.current &&
            typeof quickOpen === "string"
        ) {
            const quickOpenNum = Number.parseInt(quickOpen, 10);
            switch (quickOpenNum) {
                case PreferencesQuickOpenActions.USERNAME_EDIT:
                    usernameModalUtils.open();
                    break;
                case PreferencesQuickOpenActions.AVATAR_EDIT:
                    avatarModalUtils.open();
                    break;
                case PreferencesQuickOpenActions.BANNER_EDIT:
                    bannerModalUtils.open();
                    break;
            }
            hasLoadedQueryParameters.current = true;
        }
    }, [avatarModalUtils, bannerModalUtils, quickOpen, usernameModalUtils]);

    if (userProfile.isLoading) {
        return <CenteredLoading />;
    }
    return (
        <Stack w={"100%"} className={"items-center"}>
            <Box className={"w-full lg:w-5/12"}>
                <PreferencesFeaturedAchievement />
            </Box>
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
                        {obtainedAchievements.data?.map((achievement) => {
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
        </Stack>
    );
};

export default PreferencesProfileScreen;
