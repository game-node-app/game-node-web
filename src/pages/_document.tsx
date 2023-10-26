import { Html, Head, Main, NextScript } from "next/document";
import { ColorSchemeScript } from "@mantine/core";
import React from "react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <ColorSchemeScript defaultColorScheme="dark" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
