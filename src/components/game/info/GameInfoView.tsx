import React from "react";
import { Container, Flex, Grid, Paper, Title } from "@mantine/core";
import GameFigureImage from "@/components/game/view/figure/GameFigureImage";
import GameInfoDetails from "@/components/game/info/GameInfoDetails";
import useOnMobile from "@/hooks/useOnMobile";
import GameInfoActions from "@/components/game/info/GameInfoActions";
import { Game } from "@/wrapper";
import { CoverSize } from "@/components/game/util/getSizedImageUrl";

interface IGameInfoViewProps {
    game: Game;
}

const GameInfoView = ({ game }: IGameInfoViewProps) => {
    const onMobile = useOnMobile();
    return (
        <Container fluid px={{ base: 0, lg: "md" }}>
            <Paper w={"100%"} h={"100%"}>
                <Grid
                    columns={12}
                    className="justify-center lg:justify-start ps-3"
                >
                    <Grid.Col span={{ xs: 12, lg: 3 }} className="">
                        <GameFigureImage
                            game={game}
                            size={CoverSize.COVER_BIG}
                        />
                        <Title
                            ta={"center"}
                            size={"h3"}
                            className="px-5 lg: px-1"
                        >
                            {game.name}
                        </Title>
                    </Grid.Col>
                    <Grid.Col span={{ xs: 12, lg: 3 }} className="mt-4">
                        <GameInfoDetails game={game} />
                    </Grid.Col>
                    <Grid.Col
                        span={{ xs: 12, lg: 6 }}
                        className="my-8 flex justify-center lg:justify-normal items-start"
                    >
                        <Flex w={"100%"} justify={"end"} align={"start"}>
                            <GameInfoActions
                                game={game}
                                wrapperProps={{
                                    className: "me-10",
                                }}
                            />
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Paper>
        </Container>
    );
};

export default GameInfoView;
