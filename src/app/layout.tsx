import React, { PropsWithChildren } from "react";
import Providers from "@/app/providers";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "@/util/theme";

export const metadata = {
    title: "GameNode",
};

function RootLayout({ children }: PropsWithChildren) {
    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <title>GameNode</title>
            </head>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

export default RootLayout;
