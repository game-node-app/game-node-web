import React from "react";
import { useQuery } from "@tanstack/react-query";
import { SyncHltbService } from "@/wrapper/server";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoPlaytimeItem from "@/components/game/info/playtime/GameInfoPlaytimeItem";
import { Space, Text } from "@mantine/core";

interface Props {
    gameId: number;
}

const GameInfoPlaytime = ({ gameId }: Props) => {
    const playtimeQuery = useQuery({
        queryKey: ["game", "playtime", gameId],
        queryFn: () => {
            return SyncHltbService.hltbControllerFindPlaytimeForGameId(gameId);
        },
        enabled: !!gameId,
        staleTime: Infinity,
        retry: 1,
    });
    const playtime = playtimeQuery.data;
    return (
        <DetailsBox
            title={"Playtime"}
            withBorder
            withDimmedTitle
            enabled={playtimeQuery.isLoading || playtimeQuery.isSuccess}
            stackProps={{
                gap: 1,
            }}
        >
            <Space h={"0.8rem"} />
            <GameInfoPlaytimeItem
                name={"Main"}
                isLoading={playtimeQuery.isLoading}
                value={playtime?.timeMain}
            />
            <GameInfoPlaytimeItem
                name={"Main + Extras"}
                isLoading={playtimeQuery.isLoading}
                value={playtime?.timePlus}
            />
            <GameInfoPlaytimeItem
                name={"100%"}
                isLoading={playtimeQuery.isLoading}
                value={playtime?.time100}
            />
            <Text className={"text-center text-xs mt-4"} c={"dimmed"}>
                Data provided by <a href={"https://howlongtobeat.com"}>HLTB</a>
            </Text>
        </DetailsBox>
    );
};

export default GameInfoPlaytime;
