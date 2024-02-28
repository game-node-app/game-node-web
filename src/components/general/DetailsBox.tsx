import { Box, Stack, Text } from "@mantine/core";
import React from "react";

interface IDetailsBoxProps {
    enabled?: boolean;
    title: string;
    dimmedTitle?: boolean;
    withBorder?: boolean;
    description?: string | undefined;
    content: any;
}

export const DetailsBox = ({
    enabled = true,
    title,
    dimmedTitle = false,
    withBorder = false,
    description,
    content,
}: IDetailsBoxProps) => {
    return (
        enabled && (
            <Stack
                w={"100%"}
                h={"fit-content"}
                styles={{
                    root: {
                        borderWidth: withBorder ? "2px" : undefined,
                        borderColor: withBorder ? "#1F1F1F" : undefined,
                        borderRadius: withBorder ? "6px" : undefined,
                    },
                }}
                className={`flex justify-start p-2 lg:p-0`}
            >
                <Box className={"w-full px-4 py-2"}>
                    <Text
                        className={
                            dimmedTitle
                                ? "text-[#5C5C5C] text-sm mb-1"
                                : "font-bold text-md mb-2"
                        }
                    >
                        {title}
                    </Text>
                    {description && (
                        <Text fz={"sm"} lh={"md"} c={"dimmed"} className="mb-4">
                            {description}
                        </Text>
                    )}

                    {content ?? "Unknown"}
                </Box>
            </Stack>
        )
    );
};
