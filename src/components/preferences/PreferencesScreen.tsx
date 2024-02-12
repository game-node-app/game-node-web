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
        <SessionAuth>
            <Paper className={"w-full h-full"}>
                <Group className={"w-full h-full items-start"}>
                    <Stack className={"w-full lg:w-3/12 lg:mt-12"}>
                        {onMobile ? (
                            <Flex className={"w-full"}>
                                <PreferencesScreenSelector
                                    activeItem={currentActiveItem}
                                    onChange={setCurrentActiveItem}
                                />
                            </Flex>
                        ) : (
                            <PreferencesScreenSideBar
                                activeItem={currentActiveItem}
                                onChange={setCurrentActiveItem}
                            />
                        )}
                    </Stack>
                    {!onMobile && <Divider orientation={"vertical"} />}
                    <Stack
                        className={
                            "w-full h-full lg:w-8/12 justify-start items-start"
                        }
                    >
                        {render()}
                    </Stack>
                </Group>
            </Paper>
        </SessionAuth>
    );
};

export default PreferencesScreen;
