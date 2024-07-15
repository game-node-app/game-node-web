import React from "react";
import { Flex, Paper } from "@mantine/core";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoCarousel from "@/components/game/info/carousel/GameInfoCarousel";
import Break from "@/components/general/Break";
import { useGame } from "@/components/game/hooks/useGame";
import GameRelatedGamesCarousel from "@/components/game/info/GameRelatedGamesCarousel";

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
    return (
        <Paper w={"100%"} h={"100%"} suppressHydrationWarning>
            <Flex w={"100%"} h={"100%"} wrap={"wrap"}>
                <GameRelatedGamesCarousel
                    title={"Expansion of"}
                    gameId={id}
                    relationProperty={"dlcOf"}
                />
                <GameRelatedGamesCarousel
                    title={"Expansions"}
                    gameId={id}
                    relationProperty={"expansionOf"}
                />
                <GameRelatedGamesCarousel
                    title={"DLC of"}
                    gameId={id}
                    relationProperty={"dlcOf"}
                />
                <GameRelatedGamesCarousel
                    title={"DLCs"}
                    gameId={id}
                    relationProperty={"dlcs"}
                />
                <GameRelatedGamesCarousel
                    title={"Similar games"}
                    gameId={id}
                    relationProperty={"similarGames"}
                />
            </Flex>
        </Paper>
    );
};

export default GameExtraInfoView;
