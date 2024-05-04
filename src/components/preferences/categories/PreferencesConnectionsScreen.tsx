import React from "react";
import { Group, Stack } from "@mantine/core";
import PreferencesConnectionSteam from "@/components/preferences/handlers/connections/steam/PreferencesConnectionSteam";

const PreferencesConnectionsScreen = () => {
    return (
        <Stack w={"100%"} className={"items-center mt-4"}>
            <Stack className={"w-full my-4"}>
                <PreferencesConnectionSteam />
            </Stack>
        </Stack>
    );
};

export default PreferencesConnectionsScreen;
