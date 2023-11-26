"use client";
import React, { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { theme } from "@/util/theme";

const Providers = ({ children }: PropsWithChildren) => {
    const [queryClient, _] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                    },
                },
            }),
    );
    return (
        <MantineProvider theme={theme} forceColorScheme={"dark"}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </MantineProvider>
    );
};

export default Providers;
