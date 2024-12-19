import React, { useEffect, useRef } from "react";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useRouter } from "next/router";
import {
    Anchor,
    Button,
    Dialog,
    Divider,
    Drawer,
    Group,
    Image,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useDisclosure, useSessionStorage } from "@mantine/hooks";

/**
 * Component that shows an 'open in app' dialog for mobile users.
 * @constructor
 */
const OpenInAppDialog = () => {
    const router = useRouter();
    const onMobile = useOnMobile();

    const [hasBeenClosed, setHasBeenClosed] = useSessionStorage({
        key: "open-in-app-dialog-closed",
        defaultValue: false,
        getInitialValueInEffect: false,
    });

    const [opened, { close, open }] = useDisclosure();

    useEffect(() => {
        if (onMobile && router.pathname !== "/" && !hasBeenClosed) {
            open();
            setHasBeenClosed(true);
        }
    }, [hasBeenClosed, onMobile, open, router.pathname, setHasBeenClosed]);

    return (
        <Drawer
            opened={opened}
            onClose={close}
            withCloseButton
            size="30vh"
            radius="md"
            position={"bottom"}
            title={"GameNode is (even) better in the app!"}
        >
            <Stack className={"w-full items-center"}>
                <Button size={"md"}>Open in app</Button>
                <Divider
                    label={"OR"}
                    orientation={"horizontal"}
                    className={"w-full"}
                />
                <Anchor
                    className={"w-40"}
                    href={
                        "https://play.google.com/store/apps/details?id=app.gamenode&pcampaignid=web_share"
                    }
                >
                    <Image
                        src={"/img/google_play_badge_english.png"}
                        alt={"Get it on Google Play badge"}
                    />
                </Anchor>
            </Stack>
        </Drawer>
    );
};

export default OpenInAppDialog;
