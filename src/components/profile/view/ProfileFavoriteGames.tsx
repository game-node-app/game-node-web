import React, { useMemo } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import { useGames } from "@/components/game/hooks/useGames";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import GameGridFigure from "@/components/game/figure/GameGridFigure";
import useOnMobile from "@/components/general/hooks/useOnMobile";
import useCollectionEntriesForUserId from "@/components/collection/collection-entry/hooks/useCollectionEntriesForUserId";
import getFavoriteCollectionEntries from "@/components/collection/collection-entry/util/getFavoriteCollectionEntries";

interface Props {
    userId: string;
}

const ProfileFavoriteGames = ({ userId }: Props) => {
    const onMobile = useOnMobile();
    const collectionEntriesQuery = useCollectionEntriesForUserId(userId);
    const gamesIds = useMemo(() => {
        if (collectionEntriesQuery.data) {
            const favoriteGames = getFavoriteCollectionEntries(
                collectionEntriesQuery.data,
            );
            return favoriteGames.map((entry) => entry.gameId);
        }

        return [];
    }, [collectionEntriesQuery.data]);
    const gamesQuery = useGames({
        gameIds: gamesIds,
        relations: {
            cover: true,
        },
    });

    const isFailed = collectionEntriesQuery.isError || gamesQuery.isError;

    const isEmpty =
        collectionEntriesQuery.data == undefined ||
        collectionEntriesQuery.data.length === 0 ||
        gamesQuery.data == undefined ||
        gamesQuery.data.data.length === 0;

    if (isEmpty) {
        return (
            <CenteredErrorMessage
                message={"This user has no public favorite games."}
            />
        );
    } else if (isFailed) {
        return (
            <CenteredErrorMessage
                message={"We couldn't fetch this data. Please try again."}
            />
        );
    }
    return (
        <SimpleGrid cols={onMobile ? 3 : 6} w={"100%"}>
            {gamesQuery.data?.data.map((game) => {
                return <GameGridFigure key={game.id} game={game} />;
            })}
        </SimpleGrid>
    );
};

export default ProfileFavoriteGames;
