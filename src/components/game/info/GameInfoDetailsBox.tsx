import { Box, Stack, Text } from "@mantine/core";
import React from "react";

interface IGameInfoDetailsBoxProps {
    title: string;
    description?: string | undefined;
    content: React.ReactElement | string | undefined | null;
}

export const GameInfoDetailsBox = ({
    title,
    description,
    content,
}: IGameInfoDetailsBoxProps) => {
    const useText = typeof content === "string" || content == undefined;
    return (
        <Stack
            w={"100%"}
            h={"fit-content"}
            className="flex justify-start border-2 border-[#1F1F1F] rounded p-2 lg:p-0"
        >
            <Box className={"w-full px-4 py-2"}>
                <Text c={""} className="font-bold text-sm mb-2">
                    {title}
                </Text>
                {description && (
                    <Text fz={"sm"} lh={"md"} c={"dimmed"} className="mb-2">
                        {description}
                    </Text>
                )}

                {useText ? (
                    <Text fz={"sm"} lh={"md"} className="">
                        {content ?? "Unknown"}
                    </Text>
                ) : (
                    content
                )}
            </Box>
        </Stack>
    );
};
