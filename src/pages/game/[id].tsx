import React, { useEffect, useRef } from "react";
import { Container } from "@mantine/core";
import GameInfoView, {
    DEFAULT_GAME_INFO_VIEW_DTO,
} from "@/components/game/info/GameInfoView";
import { useRouter } from "next/router";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import GameExtraInfoView, {
    DEFAULT_GAME_EXTRA_INFO_DTO,
} from "@/components/game/info/GameExtraInfoView";
import {
    GetStaticPaths,
    GetStaticPathsContext,
    GetStaticPathsResult,
    NextPageContext,
} from "next";
import {
    Game,
    GameRepositoryFindOneDto,
    GameRepositoryService,
    StatisticsActionDto,
    StatisticsQueueService,
} from "@/wrapper/server";
import GameInfoReviewView from "@/components/game/info/review/GameInfoReviewView";
import sourceType = StatisticsActionDto.sourceType;

export const getServerSideProps = async (context: NextPageContext) => {
    const dto: GameRepositoryFindOneDto = DEFAULT_GAME_INFO_VIEW_DTO;
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
    });
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

    /**
     * Stores the path parameter "id" of the last registered game view.
     */
    const lastRegisteredGameView = useRef<string | undefined>(undefined);

    /**
     * Effect to add to game's statistics views.
     */
    useEffect(() => {
        if (
            router.isReady &&
            id != undefined &&
            lastRegisteredGameView.current !== id
        ) {
            const idAsNumber = parseInt(id as string, 10);
            StatisticsQueueService.statisticsQueueControllerAddView({
                sourceType: sourceType.GAME,
                sourceId: `${idAsNumber}`,
            });
            lastRegisteredGameView.current = id as string;
        }
    }, [id, router]);

    /**
     * Effect to render /404 if necessary
     */
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
                <GameInfoView id={idAsNumber} />
            </Container>
            <Container fluid mt={"30px"} p={0}>
                <GameInfoReviewView gameId={idAsNumber} />
            </Container>
            <Container fluid mt={"30px"} p={0}>
                <GameExtraInfoView id={idAsNumber} />
            </Container>
        </Container>
    );
};

export default GameInfoPage;
