import React, { useCallback, useEffect } from "react";
import { init } from "@socialgouv/matomo-next";
import { useLocalStorage, useSessionStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { Button, Flex, Group, Stack, Text } from "@mantine/core";
import Link from "next/link";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

const MatomoTracker = () => {
    const [hasAcceptedCookies, setHasAcceptedCookies] =
        useLocalStorage<boolean>({
            key: "cookie-consent",
            defaultValue: false,
            getInitialValueInEffect: false,
        });

    console.log(hasAcceptedCookies);

    const showCookieConsentNotification = useCallback(() => {
        if (hasAcceptedCookies != undefined && hasAcceptedCookies) return;
        notifications.show({
            id: "cookie-notice",
            title: "Notice",
            withCloseButton: false,
            autoClose: false,
            withBorder: true,
            message: (
                <Stack className={"w-full items-start"}>
                    <Text>
                        We use cookies and similar storage methods to keep track
                        of your session and how you are using our website. We do
                        not use third-party cookies.
                    </Text>
                    <Flex className={"w-full justify-end"}>
                        <Group>
                            <Link href={"/privacy"} className={"w-fit"}>
                                <Button color={"indigo"}>Learn more</Button>
                            </Link>
                            <Button
                                onClick={() => {
                                    setHasAcceptedCookies(true);
                                    notifications.hide("cookie-notice");
                                }}
                            >
                                I understand
                            </Button>
                        </Group>
                    </Flex>
                </Stack>
            ),
        });
    }, [hasAcceptedCookies, setHasAcceptedCookies]);
    useEffect(() => {
        if (!hasAcceptedCookies) {
            showCookieConsentNotification();
        } else if (MATOMO_URL && MATOMO_SITE_ID) {
            init({
                url: MATOMO_URL,
                siteId: MATOMO_SITE_ID,
            });
        }
    }, [hasAcceptedCookies, showCookieConsentNotification]);

    useEffect(() => {}, []);
    return <></>;
};

export default MatomoTracker;
