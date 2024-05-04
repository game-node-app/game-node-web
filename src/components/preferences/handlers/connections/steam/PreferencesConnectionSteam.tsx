import React from "react";
import { Group, Image, Paper, Stack, Switch, Text, Title } from "@mantine/core";
import { getServerStoredIcon } from "@/util/getServerStoredImages";
import { useOwnUserConnection } from "@/components/connections/hooks/useOwnUserConnection";
import { useDisclosure } from "@mantine/hooks";
import PreferencesConnectionSteamModal from "@/components/preferences/handlers/connections/steam/PreferencesConnectionSteamModal";
import { ConnectionCreateDto } from "@/wrapper/server";
import type = ConnectionCreateDto.type;

const PreferencesConnectionSteam = () => {
    const userConnection = useOwnUserConnection(type.STEAM);
    const [modalOpened, modalUtils] = useDisclosure();
    return (
        <Paper
            className={"rounded"}
            styles={{
                root: {
                    backgroundColor: "#161616",
                },
            }}
        >
            <PreferencesConnectionSteamModal
                opened={modalOpened}
                onClose={modalUtils.close}
            />
            <Group
                className={"w-full h-full min-h-28 p-2 px-4"}
                styles={{
                    root: {
                        backgroundColor: "rgb(255,0,0);",
                    },
                }}
            >
                <Image
                    alt={"Steam icon"}
                    src={getServerStoredIcon("steam")}
                    w={38}
                    h={38}
                />
                <Stack gap={3}>
                    {userConnection.data ? (
                        <>
                            <Title size={"h5"}>
                                {userConnection.data.sourceUsername}
                            </Title>
                            <Text c={"dimmed"}>Connected</Text>
                        </>
                    ) : (
                        <>
                            <Text>Not connected</Text>
                        </>
                    )}
                </Stack>
                <Stack className={"ms-auto me-4"}>
                    <Switch
                        checked={userConnection.data != undefined}
                        onChange={(v) => {
                            modalUtils.open();
                        }}
                    />
                </Stack>
            </Group>
        </Paper>
    );
};

export default PreferencesConnectionSteam;
