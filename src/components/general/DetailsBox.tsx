import { Box, MantineColor, Stack, Text } from "@mantine/core";
import React, { useMemo } from "react";

interface IDetailsBoxProps {
    enabled?: boolean;
    title: string;
    description?: string | undefined;
    content:
        | React.ReactElement
        | React.ReactElement[]
        | string
        | undefined
        | null;
}

export const DetailsBox = ({
    enabled = true,
    title,
    description,
    content,
}: IDetailsBoxProps) => {
    return (
        enabled && (
            <Stack
                w={"100%"}
                h={"fit-content"}
                className="flex justify-start p-2 lg:p-0"
            >
                <Box className={"w-full px-4 py-2"}>
                    <Text className="font-bold text-md mb-2">{title}</Text>
                    {description && (
                        <Text fz={"sm"} lh={"md"} c={"dimmed"} className="mb-2">
                            {description}
                        </Text>
                    )}

                    {content ?? "Unknown"}
                </Box>
            </Stack>
        )
    );
};
