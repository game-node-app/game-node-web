import React, { useMemo } from "react";
import useCollectionEntriesForUserId from "@/components/collection/collection-entry/hooks/useCollectionEntriesForUserId";
import GameView from "@/components/game/view/GameView";
import { useGames } from "@/components/game/hooks/useGames";

interface Props {
    userId: string;
    offset?: number;
    limit?: number;
}

const RecentCollectionEntriesView = ({
    userId,
    offset = 0,
    limit = 12,
}: Props) => {
    const collectionEntriesQuery = useCollectionEntriesForUserId(
        userId as string,
        offset,
        limit,
    );

    const gameIds = useMemo(() => {
        return collectionEntriesQuery.data?.data?.map((entry) => entry.gameId);
    }, [collectionEntriesQuery]);

    const gamesQuery = useGames({
        gameIds: gameIds,
        relations: {
            cover: true,
        },
    });

    const games = gamesQuery.data;
    return (
        <GameView layout={"grid"}>
            <GameView.Content items={games} />
        </GameView>
    );
};

export default RecentCollectionEntriesView;
