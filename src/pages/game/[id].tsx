import React, { useEffect } from "react";
import { Container } from "@mantine/core";
import GameInfoView from "@/components/game/info/GameInfoView";
import { Game, GameRepositoryRequestDto } from "@/wrapper";
import { useRouter } from "next/router";
import { getGameInfo } from "@/components/game/util/getGameInfo";
import { useQuery } from "react-query";
import GameExtraInfoView from "@/components/game/info/GameExtraInfoView";

const GameInfoPage = () => {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (router.isReady && id == undefined) {
            router.push("/404");
        }
    }, [id, router]);

    return (
        <Container fluid pos={"relative"} className="mb-12" mih={"100vh"} p={0}>
            <Container fluid mt={"30px"} p={0}>
                <GameInfoView id={id as string} />
            </Container>
            <Container fluid mt={"120px"} p={0}>
                <GameExtraInfoView id={id as string} />
            </Container>
        </Container>
    );
};

export default GameInfoPage;
