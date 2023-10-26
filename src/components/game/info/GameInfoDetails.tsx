import React from "react";
import { Box, Stack, Text, Title } from "@mantine/core";
import { Game } from "../../../wrapper";

const GameInfoViewDetailsTextBox = ({
    title,
    content,
}: {
    title: string;
    content?: string;
}) => {
    return (
        <Stack
            w={"100%"}
            gap={4}
            className="flex justify-start border-2 border-[#1F1F1F] rounded p-2 lg:p-0"
        >
            <Box className={"w-full px-4 py-2"}>
                <Text c={"dimmed"} className="text-sm">
                    {title}
                </Text>
                <Text>{content ?? "Unknown"}</Text>
            </Box>
        </Stack>
    );
};

interface IGameInfoDetailsProps {
    game: Game;
}

const GameInfoDetails = ({ game }: IGameInfoDetailsProps) => {
    return (
        <Stack align={"start"} justify={"start"} gap={"0.5rem"}>
            <GameInfoViewDetailsTextBox
                title={"Launch date"}
                content={"PLACEHOLDER"}
            />
            <GameInfoViewDetailsTextBox
                title={"Developer(s)"}
                content={undefined}
            />
            <GameInfoViewDetailsTextBox
                title={"Publisher(s)"}
                content={undefined}
            />
            <GameInfoViewDetailsTextBox
                title={"Genres"}
                content={"PLACEHOLDER"}
            />
        </Stack>
    );
};

export default GameInfoDetails;
