import React, { MutableRefObject } from "react";
import {
    Box,
    Divider,
    Flex,
    Paper,
    Rating,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import useUserId from "@/components/auth/hooks/useUserId";
import { useGame } from "@/components/game/hooks/useGame";
import { DEFAULT_GAME_INFO_VIEW_DTO } from "@/components/game/info/GameInfoView";
import GameFigureImage from "@/components/game/figure/GameFigureImage";
import useReviewForUserIdAndGameId from "@/components/review/hooks/useReviewForUserIdAndGameId";
import { DetailsBox } from "@/components/general/DetailsBox";
import GameInfoPlatforms from "@/components/game/info/GameInfoPlatforms";
import { useOwnCollectionEntryForGameId } from "@/components/collection/collection-entry/hooks/useOwnCollectionEntryForGameId";
import GameInfoOwnedPlatforms from "@/components/game/info/GameInfoOwnedPlatforms";
import GameNodeLogo from "@/components/general/GameNodeLogo";

interface SharePreviewProps {
    gameId: number;
    withOwnedPlatforms?: boolean;
    withUserScore?: boolean;
    withShortReview?: boolean;
}

export const GAME_INFO_SHARE_PREVIEW_ID = "game-info-preview-id";

const GameInfoSharePreview = ({
    gameId,
    withOwnedPlatforms = true,
    withShortReview = false,
    withUserScore = true,
}: SharePreviewProps) => {
    const userId = useUserId();
    const gameQuery = useGame(gameId, DEFAULT_GAME_INFO_VIEW_DTO);
    const game = gameQuery.data;
    const reviewQuery = useReviewForUserIdAndGameId(userId, gameId);
    const rating = reviewQuery.data?.rating ?? 0;
    return (
        <Paper
            w={"100%"}
            styles={{
                root: {
                    backgroundColor: "#1A1A1A",
                },
            }}
        >
            <Stack id={GAME_INFO_SHARE_PREVIEW_ID} w={"100%"} align={"center"}>
                <Stack align={"center"} className={"w-full p-16 pb-2"}>
                    <GameFigureImage game={game} />
                    <Title size={"h4"} className={"text-center mt-4"}>
                        {game?.name}
                    </Title>
                    <Rating
                        readOnly
                        value={rating}
                        color={"#F15025"}
                        size={"lg"}
                    />
                </Stack>
                <Divider w={"100%"} />
                <Stack align={"center"} className={"w-full"}>
                    <Text>Played in</Text>
                    <GameInfoOwnedPlatforms
                        gameId={gameId}
                        iconsProps={{
                            w: 36,
                        }}
                    />
                </Stack>
                <Flex justify={"center"} className={"mt-16 mb-8"}>
                    <GameNodeLogo className={"w-20 h-auto"} withBadge={false} />
                </Flex>
            </Stack>
        </Paper>
    );
};

export default GameInfoSharePreview;
