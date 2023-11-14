import {
    createTheme,
    DEFAULT_THEME,
    MantineProvider,
    mergeMantineTheme,
} from "@mantine/core";
import { AppProps } from "next/app";
import TypesafeI18NProvider from "@/components/general/TypesafeI18nProvider";
import SuperTokensProvider from "@/components/auth/SuperTokensProvider";
import GlobalShell from "@/components/general/shell/GlobalShell";
import React, { useState } from "react";
import { RouterTransition } from "@/components/general/RouterTransition";
import { Inter } from "next/font/google";
import {
    DehydratedState,
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from "react-query";
import Head from "next/head";
import { Notifications } from "@mantine/notifications";
import { OpenAPI as ServerOpenAPI } from "@/wrapper/server";
import { OpenAPI as SearchOpenAPI } from "@/wrapper/search";
/**
 * Should always be imported BEFORE tailwind.
 */
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
/**
 * Includes tailwind styles
 */
import "@/components/globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const themeOverride = createTheme({
    fontFamily: inter.style.fontFamily,
    colors: {
        brand: [
            "#ffede5",
            "#ffd9cf",
            "#fbb3a0",
            "#f7896d",
            "#f36742",
            "#f15126",
            "#f14517",
            "#d6360b",
            "#c02d06",
            "#a82301",
        ],
    },
    primaryColor: "brand",
});

export const theme = mergeMantineTheme(DEFAULT_THEME, themeOverride);

/**
 * Basic configuration for wrapper services
 */
ServerOpenAPI.BASE = process.env.NEXT_PUBLIC_SERVER_URL!;
ServerOpenAPI.WITH_CREDENTIALS = true;
SearchOpenAPI.BASE = process.env.NEXT_PUBLIC_SEARCH_URL!;

export default function App({
    Component,
    pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
    const [queryClient, _] = useState(() => new QueryClient());
    return (
        <MantineProvider theme={theme} forceColorScheme={"dark"}>
            <Head>
                <title>GameNode</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <TypesafeI18NProvider>
                <SuperTokensProvider>
                    <QueryClientProvider client={queryClient}>
                        <Notifications />
                        <RouterTransition />
                        <GlobalShell>
                            <Hydrate state={pageProps.dehydratedState}>
                                <Component {...pageProps} />
                            </Hydrate>
                        </GlobalShell>
                    </QueryClientProvider>
                </SuperTokensProvider>
            </TypesafeI18NProvider>
        </MantineProvider>
    );
}
