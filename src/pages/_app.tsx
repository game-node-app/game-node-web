import "@/styles/globals.css";

import { emotionCache } from "@/theme/emotion-cache";
import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import TypesafeI18NProvider from "@/components/general/TypesafeI18nProvider";
import SuperTokensProvider from "@/components/auth/SuperTokensProvider";
import GlobalShell from "@/components/general/shell/GlobalShell";
import React from "react";
import { RouterTransition } from "@/components/general/RouterTransition";
import { Inter } from "next/font/google";
import UserInfoProvider from "@/components/auth/UserInfoProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { ModalsProvider } from "@mantine/modals";
import Head from "next/head";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider
            emotionCache={emotionCache}
            withGlobalStyles
            withCSSVariables
            theme={{
                fontFamily: inter.style.fontFamily,
                colorScheme: "dark",
                colors: {
                    brand: [
                        "#F8F5F4",
                        "#E9DBD7",
                        "#DEC1B9",
                        "#D9A799",
                        "#D98C77",
                        "#E16F51",
                        "#F15025",
                        "#D54A25",
                        "#B04C31",
                        "#934B38",
                    ],
                },
                primaryColor: "brand",
            }}
        >
            <Head>
                <title>GameNode</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <SuperTokensProvider>
                <QueryClientProvider client={client}>
                    <UserInfoProvider>
                        <TypesafeI18NProvider>
                            <ModalsProvider>
                                <RouterTransition />
                                <GlobalShell>
                                    <Component {...pageProps} />
                                </GlobalShell>
                            </ModalsProvider>
                        </TypesafeI18NProvider>
                    </UserInfoProvider>
                </QueryClientProvider>
            </SuperTokensProvider>
        </MantineProvider>
    );
}
