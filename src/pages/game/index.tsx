import React from "react";
import { Container } from "@mantine/core";
import GameInfoView from "@/components/game/info/GameInfoView";
import { Game } from "@/wrapper";

const GameInfoPage = () => {
    const game = undefined as any as Game;
    return (
        <Container fluid pos={"relative"} className="mb-12" mih={"100vh"}>
            <Container fluid mt={"30px"}>
                <GameInfoView game={game} />
            </Container>
        </Container>
    );
};

export default GameInfoPage;
