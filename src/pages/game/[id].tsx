import React, { useEffect } from "react";
import { Container } from "@mantine/core";
import GameInfoView, {
    DEFAULT_GAME_INFO_VIEW_DTO,
} from "@/components/game/info/GameInfoView";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "react-query";
import GameExtraInfoView from "@/components/game/info/GameExtraInfoView";
import { NextPageContext } from "next";
import {
    Game,
    GameRepositoryRequestDto,
    GameRepositoryService,
    StatisticsService,
} from "@/wrapper/server";
import GameInfoReviewView from "@/components/game/info/review/GameInfoReviewView";

export const getServerSideProps = async (context: NextPageContext) => {
    const dto: GameRepositoryRequestDto = DEFAULT_GAME_INFO_VIEW_DTO;
    const idAsNumber = parseInt(context.query.id as string, 10);

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["game", idAsNumber, dto],
        queryFn: async (): Promise<Game | undefined> => {
            if (!idAsNumber) {
                return undefined;
            }
            return GameRepositoryService.gameRepositoryControllerFindOneById(
                idAsNumber,
                dto,
            );
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
    if (idAsNumber) {
        StatisticsService.statisticsGameQueueControllerRegisterGameView(
            idAsNumber,
        );
    }

    console.log("Prefetched game info for ID: " + context.query.id);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};

const GameInfoPage = () => {
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (router.isReady && id == undefined) {
            router.push("/404");
        }
    }, [id, router]);

    if (!id) return null;

    const idAsNumber = parseInt(id as string, 10);

    return (
        <Container fluid pos={"relative"} className="mb-12" mih={"100vh"} p={0}>
            <Container fluid mt={"30px"} p={0}>
                <GameInfoView id={id as string} />
            </Container>
            <Container fluid mt={"60px"} p={0}>
                <GameInfoReviewView gameId={idAsNumber} />
            </Container>
            <Container fluid mt={"120px"} p={0}>
                <GameExtraInfoView id={id as string} />
            </Container>
        </Container>
    );
};

export default GameInfoPage;
