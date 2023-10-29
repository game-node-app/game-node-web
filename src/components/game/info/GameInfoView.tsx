import React, { useEffect, useMemo } from "react";
import { Flex, Grid, Paper, Skeleton, Stack, Title } from "@mantine/core";
import GameFigureImage from "@/components/game/view/figure/GameFigureImage";
import GameInfoDetails from "@/components/game/info/GameInfoDetails";
import useOnMobile from "@/hooks/useOnMobile";
import GameInfoActions from "@/components/game/info/GameInfoActions";
import { Game, GameRepositoryRequestDto } from "@/wrapper";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import GameInfoImageCarousel from "@/components/game/info/carousel/GameInfoImageCarousel";
import { GameInfoDetailsBox } from "@/components/game/info/GameInfoDetailsBox";
import { shuffleArray } from "@/util/shuffleArray";
import GameExtraInfoView from "@/components/game/info/GameExtraInfoView";
import Break from "@/components/general/Break";
import { useQuery } from "react-query";
import { getGameInfo } from "@/components/game/util/getGameInfo";

interface IGameInfoViewProps {
    id: string | undefined;
}

const getCombinedImages = (game: Game) => {
    const screenshotsUrls = game.screenshots
        ?.filter((screenshot) => screenshot.url != undefined)
        .map((screenshot) => screenshot.url!);

    const artworksUrls = game.artworks
        ?.filter((screenshot) => screenshot.url != undefined)
        .map((screenshot) => screenshot.url!);

    const combinedImages = [
        ...(screenshotsUrls ?? []),
        ...(artworksUrls ?? []),
    ];

    return shuffleArray(combinedImages);
};

const GameInfoView = ({ id }: IGameInfoViewProps) => {
    const gameQuery = useQuery({
        queryKey: ["game", id],
        queryFn: async (context) => {
            const dto: GameRepositoryRequestDto = {
                relations: {
                    cover: true,
                    genres: true,
                    platforms: true,
                    screenshots: true,
                    artworks: true,
                },
            };
            if (id == undefined) {
                return undefined;
            }
            const game = await getGameInfo(+id!, dto);
            if (game) {
                document.title = `${game.name} | GameNode`;
            } else {
                document.title = `GameNode`;
            }
            return game;
        },
    });
    const game = gameQuery.data;

    const onMobile = useOnMobile();
    const combinedImages = useMemo(() => {
        if (game != undefined) {
            return getCombinedImages(game);
        }
    }, [game]);

    return (
        <Paper w={"100%"} h={"100%"}>
            <Stack>
                <Grid
                    columns={12}
                    className="justify-center lg:justify-start p-3 lg:ps-3 w-full"
                >
                    <Grid.Col span={{ xs: 12, lg: 3 }}>
                        <Flex
                            wrap={"wrap"}
                            justify={"center"}
                            align={"start"}
                            w={"inherit"}
                            h={"inherit"}
                        >
                            <GameFigureImage
                                game={game}
                                isLoading={gameQuery.isLoading}
                                size={ImageSize.COVER_BIG}
                            />
                            <Break />
                            <Title
                                ta={"center"}
                                size={"h3"}
                                className="mx-5 lg:mx-1 mt-4 lg:mt-8"
                            >
                                {game ? game.name : <Skeleton />}
                            </Title>
                            <Break />
                            <GameInfoActions
                                game={game}
                                wrapperProps={{ className: "mt-4" }}
                            />
                        </Flex>
                    </Grid.Col>

                    <Grid.Col span={{ xs: 12, lg: 9 }} className="mt-4">
                        <GameInfoDetails game={game} />
                    </Grid.Col>
                </Grid>
                <Flex className={"w-full"} wrap={"wrap"}>
                    <GameInfoDetailsBox
                        title={"Images"}
                        content={
                            <GameInfoImageCarousel
                                urls={combinedImages}
                                imageSize={ImageSize.SCREENSHOT_BIG}
                                carouselProps={{
                                    withIndicators: !onMobile,
                                    withControls: !onMobile,
                                }}
                            />
                        }
                    />
                </Flex>
            </Stack>
        </Paper>
    );
};

export default GameInfoView;
