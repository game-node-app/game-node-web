import React from "react";
import { useQuery } from "react-query";
import { GameRepositoryRequestDto } from "@/wrapper/server";
import { getGameInfo } from "@/components/game/util/getGameInfo";
import { Flex, Paper } from "@mantine/core";
import { GameInfoDetailsBox } from "@/components/game/info/GameInfoDetailsBox";
import GameInfoCarousel from "@/components/game/info/carousel/GameInfoCarousel";
import Break from "@/components/general/Break";
import { sleep } from "@/util/sleep";
import { useGame } from "@/components/game/hooks/useGame";

interface IGameExtraInfoViewProps {
    id: string | undefined;
}

const GameExtraInfoView = ({ id }: IGameExtraInfoViewProps) => {
    const gameQuery = useGame(+id!, {
        relations: {
            dlcs: {
                cover: true,
            },
            similarGames: {
                cover: true,
            },
        },
    });

    return (
        <Paper w={"100%"} h={"100%"}>
            <Flex w={"100%"} h={"100%"} wrap={"wrap"}>
                <GameInfoDetailsBox
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
                <GameInfoDetailsBox
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
