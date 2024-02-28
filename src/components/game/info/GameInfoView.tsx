import React, { useEffect, useMemo } from "react";
import { Box, Flex, Grid, Paper, Skeleton, Stack, Title } from "@mantine/core";
import GameFigureImage from "@/components/game/figure/GameFigureImage";
import GameInfoDetails from "@/components/game/info/GameInfoDetails";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import GameInfoActions from "@/components/game/info/GameInfoActions";
import { Game, GameRepositoryFindOneDto } from "@/wrapper/server";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import GameInfoImageCarousel from "@/components/game/info/carousel/GameInfoImageCarousel";
import { DetailsBox } from "@/components/general/DetailsBox";
import Break from "@/components/general/Break";
import { useGame } from "@/components/game/hooks/useGame";

export const DEFAULT_GAME_INFO_VIEW_DTO: GameRepositoryFindOneDto = {
    relations: {
        cover: true,
        genres: true,
        platforms: true,
        gameModes: true,
        keywords: true,
        themes: true,
        screenshots: true,
        artworks: true,
    },
};

interface IGameInfoViewProps {
    id: number;
}

const getCombinedImages = (game: Game) => {
    const screenshotsUrls = game.screenshots
        ?.filter((screenshot) => screenshot.url != undefined)
        .map((screenshot) => screenshot.url!);

    const artworksUrls = game.artworks
        ?.filter((screenshot) => screenshot.url != undefined)
        .map((screenshot) => screenshot.url!);

    const combinedImagesUrls = [
        ...(screenshotsUrls ?? []),
        ...(artworksUrls ?? []),
    ];

    return combinedImagesUrls;
};

const GameInfoView = ({ id }: IGameInfoViewProps) => {
    const gameQuery = useGame(id, DEFAULT_GAME_INFO_VIEW_DTO);
    const game = gameQuery.data;

    const onMobile = useOnMobile();
    const combinedImages = useMemo(() => {
        if (game != undefined) {
            return getCombinedImages(game);
        }
    }, [game]);
    const hasImages = combinedImages && combinedImages.length > 0;

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
                            <Box className="w-full lg:w-96">
                                <GameFigureImage game={game} />
                            </Box>

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
                    <DetailsBox
                        enabled={hasImages}
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
