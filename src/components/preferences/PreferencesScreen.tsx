import React, { useState } from "react";
import { Box, Divider, Flex, Group, Paper, Stack } from "@mantine/core";
import useUserId from "@/components/auth/hooks/useUserId";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import PreferencesScreenSideBar, {
    PreferencesActiveItem,
} from "@/components/preferences/PreferencesScreenSideBar";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import PreferencesScreenSelector from "@/components/preferences/PreferencesScreenSelector";
import PreferencesProfileScreen from "@/components/preferences/categories/PreferencesProfileScreen";

const PreferencesScreen = () => {
    const onMobile = useOnMobile();
    const [currentActiveItem, setCurrentActiveItem] =
        useState<PreferencesActiveItem>("profile");

    const render = () => {
        switch (currentActiveItem) {
            default:
                return <PreferencesProfileScreen />;
        }
    };

    return (
        <Flex className={"justify-center w-full h-full"}>
            <Paper className={"w-full lg:w-[80vw] h-full mt-8"}>
                <Group className={"w-full h-full  items-start"}>
                    <Stack className={"w-full lg:w-3/12 lg:mt-12"}>
                        {onMobile ? (
                            <PreferencesScreenSelector
                                activeItem={currentActiveItem}
                                onChange={setCurrentActiveItem}
                            />
                        ) : (
                            <PreferencesScreenSideBar
                                activeItem={currentActiveItem}
                                onChange={setCurrentActiveItem}
                            />
                        )}
                    </Stack>
                    {!onMobile && <Divider orientation={"vertical"} />}
                    <Stack className={"w-full h-full lg:w-7/12 mt-4"}>
                        {render()}
                    </Stack>
                </Group>
            </Paper>
        </Flex>
    );
};

export default PreferencesScreen;
