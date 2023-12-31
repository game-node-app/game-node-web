import React from "react";
import { Flex, Paper } from "@mantine/core";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoCarousel from "@/components/game/info/carousel/GameInfoCarousel";
import Break from "@/components/general/Break";
import { useGame } from "@/components/game/hooks/useGame";

interface IGameExtraInfoViewProps {
    id: number;
}

export const DEFAULT_GAME_EXTRA_INFO_DTO = {
    relations: {
        dlcs: {
            cover: true,
        },
        similarGames: {
            cover: true,
        },
    },
};

const GameExtraInfoView = ({ id }: IGameExtraInfoViewProps) => {
    const gameQuery = useGame(id, DEFAULT_GAME_EXTRA_INFO_DTO);

    return (
        <Paper w={"100%"} h={"100%"} suppressHydrationWarning>
            <Flex w={"100%"} h={"100%"} wrap={"wrap"}>
                <DetailsBox
                    title={"Similar games"}
                    content={
                        <GameInfoCarousel
                            games={gameQuery.data?.similarGames}
                            isLoading={gameQuery.isLoading}
                            isError={gameQuery.isError}
                        />
                    }
                />
                <Break />
                <DetailsBox
                    title={"DLCs"}
                    content={
                        <GameInfoCarousel
                            games={gameQuery.data?.dlcs}
                            isLoading={gameQuery.isLoading}
                            isError={gameQuery.isError}
                        />
                    }
                />
            </Flex>
        </Paper>
    );
};

export default GameExtraInfoView;
