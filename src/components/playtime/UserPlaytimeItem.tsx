import React, { useMemo } from "react";
import { GameExternalGame, UserPlaytimeDto } from "@/wrapper/server";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import { useGame } from "@/components/game/hooks/useGame";
import {
    getSizedImageUrl,
    ImageSize,
} from "@/components/game/util/getSizedImageUrl";
import { Box, Group, Image, Overlay, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";
import { useGameExternalStores } from "@/components/game/hooks/useGameExternalStores";
import { getServerStoredIcon } from "@/util/getServerStoredImages";

interface Props {
    playtime: UserPlaytimeDto;
}

const UserPlaytimeItem = ({ playtime }: Props) => {
    const onMobile = useOnMobile();

    const gameId = playtime.gameId;
    const gameQuery = useGame(gameId, {
        relations: {
            cover: true,
        },
    });

    const externalStoresQuery = useGameExternalStores(gameId);

    const externalStore = useMemo(() => {
        const externalGameCategory = playtime.externalGame?.category;
        if (
            externalStoresQuery.data == undefined ||
            externalGameCategory == undefined
        )
            return undefined;

        return externalStoresQuery.data.find(
            (item) => item.category === externalGameCategory,
        );
    }, [externalStoresQuery.data, playtime.externalGame?.category]);

    const imageUrl = getSizedImageUrl(
        gameQuery.data?.cover?.url,
        onMobile ? ImageSize.SCREENSHOT_MED : ImageSize.SCREENSHOT_BIG,
    );

    return (
        <Box
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
            }}
            className={"relative w-full h-28 rounded-md"}
        >
            <Overlay backgroundOpacity={0.8} className={"z-0"}></Overlay>
            <Group
                className={
                    "w-full h-full relative z-20 items-center flex-nowrap"
                }
            >
                <Stack
                    className={
                        "w-fit max-w-32 items-start justify-center h-full"
                    }
                >
                    <Link
                        href={`/game/${gameQuery.data?.id}`}
                        className={"flex flex-nowrap ms-4 max-w-28"}
                    >
                        <Title className={"text-sm lg:text-md text-center"}>
                            {gameQuery.data?.name}
                        </Title>
                    </Link>
                </Stack>
                <Group
                    className={
                        "ms-auto w-5/12 justify-end items-center flex-nowrap gap-8 me-4"
                    }
                >
                    <Group className={"w-full flex-nowrap justify-end"}>
                        <Text className={"text-sm lg:text-md"}>
                            Recent
                            <br />
                            <Text span className={"text-dimmed text-sm"}>
                                {Math.ceil(
                                    playtime.recentPlaytimeSeconds / 3600,
                                )}
                                h
                            </Text>
                        </Text>
                        <Text className={"text-sm lg:text-md"}>
                            Total <br />
                            <Text span className={"text-dimmed text-sm"}>
                                {Math.ceil(
                                    playtime.totalPlaytimeSeconds / 3600,
                                )}
                                h
                            </Text>
                        </Text>
                    </Group>
                    {externalStore && (
                        <Image
                            w={32}
                            alt={externalStore.storeName!}
                            src={getServerStoredIcon(externalStore.icon!)}
                        />
                    )}
                </Group>
            </Group>
        </Box>
    );
};

export default UserPlaytimeItem;
