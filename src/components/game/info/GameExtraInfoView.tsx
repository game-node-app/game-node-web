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
    const hasDlcs =
        gameQuery.data != undefined &&
        gameQuery.data.dlcs != undefined &&
        gameQuery.data.dlcs.length > 0;
    const hasSimilarGames =
        gameQuery.data != undefined &&
        gameQuery.data.similarGames != undefined &&
        gameQuery.data.similarGames.length > 0;
    return (
        <Paper w={"100%"} h={"100%"} suppressHydrationWarning>
            <Flex w={"100%"} h={"100%"} wrap={"wrap"}>
                <DetailsBox enabled={hasDlcs} title={"DLCs"}>
                    <GameInfoCarousel
                        games={gameQuery.data?.dlcs}
                        isLoading={gameQuery.isLoading}
                        isError={gameQuery.isError}
                    />
                </DetailsBox>
                <Break />
                <DetailsBox enabled={hasSimilarGames} title={"Similar games"}>
                    <GameInfoCarousel
                        games={gameQuery.data?.similarGames}
                        isLoading={gameQuery.isLoading}
                        isError={gameQuery.isError}
                    />
                </DetailsBox>
            </Flex>
        </Paper>
    );
};

export default GameExtraInfoView;
