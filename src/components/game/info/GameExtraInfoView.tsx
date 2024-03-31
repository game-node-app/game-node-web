import React from "react";
import { Flex, Paper } from "@mantine/core";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoCarousel from "@/components/game/info/carousel/GameInfoCarousel";
import Break from "@/components/general/Break";
import { useGame } from "@/components/game/hooks/useGame";

interface IGameExtraInfoViewProps {
    id: number;
}

const DEFAULT_SIMILAR_GAMES_DTO = {
    relations: {
        similarGames: {
            cover: true,
        },
    },
};

const DEFAULT_DLCS_GAMES_DTO = {
    relations: {
        dlcs: {
            cover: true,
        },
    },
};

const DEFAULT_DLC_OF_GAMES_DTO = {
    relations: {
        dlcOf: {
            cover: true,
        },
    },
};

const GameExtraInfoView = ({ id }: IGameExtraInfoViewProps) => {
    const similarGamesQuery = useGame(id, DEFAULT_SIMILAR_GAMES_DTO);
    const dlcsGamesQuery = useGame(id, DEFAULT_DLCS_GAMES_DTO);
    const dlcsOfGamesQuery = useGame(id, DEFAULT_DLC_OF_GAMES_DTO);
    const hasDlcsOf =
        dlcsOfGamesQuery.data != undefined &&
        dlcsOfGamesQuery.data.dlcOf != undefined &&
        dlcsOfGamesQuery.data.dlcOf.length > 0;
    const hasDlcs =
        dlcsGamesQuery.data != undefined &&
        dlcsGamesQuery.data.dlcs != undefined &&
        dlcsGamesQuery.data.dlcs.length > 0;

    const hasSimilarGames =
        similarGamesQuery.data != undefined &&
        similarGamesQuery.data.similarGames != undefined &&
        similarGamesQuery.data.similarGames.length > 0;
    return (
        <Paper w={"100%"} h={"100%"} suppressHydrationWarning>
            <Flex w={"100%"} h={"100%"} wrap={"wrap"}>
                <DetailsBox enabled={hasDlcsOf} title={"DLC of"}>
                    <GameInfoCarousel
                        games={dlcsOfGamesQuery.data?.dlcOf}
                        isLoading={dlcsOfGamesQuery.isLoading}
                        isError={dlcsOfGamesQuery.isError}
                    />
                </DetailsBox>
                <Break />
                <DetailsBox enabled={hasDlcs} title={"DLCs"}>
                    <GameInfoCarousel
                        games={dlcsGamesQuery.data?.dlcs}
                        isLoading={dlcsGamesQuery.isLoading}
                        isError={dlcsGamesQuery.isError}
                    />
                </DetailsBox>
                <Break />
                <DetailsBox enabled={hasSimilarGames} title={"Similar games"}>
                    <GameInfoCarousel
                        games={similarGamesQuery.data?.similarGames}
                        isLoading={similarGamesQuery.isLoading}
                        isError={similarGamesQuery.isError}
                    />
                </DetailsBox>
            </Flex>
        </Paper>
    );
};

export default GameExtraInfoView;
