import React, { useMemo } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import { useFavoriteCollectionEntries } from "@/components/collection/collection-entry/hooks/useFavoriteCollectionEntries";
import { useGames } from "@/components/game/hooks/useGames";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";
import GameGridFigure from "@/components/game/figure/GameGridFigure";
import useOnMobile from "@/components/general/hooks/useOnMobile";

interface Props {
    userId: string;
}

const ProfileFavoriteGames = ({ userId }: Props) => {
    const onMobile = useOnMobile();
    const favoriteGamesQuery = useFavoriteCollectionEntries(userId, 0, 12);
    const gamesIds = useMemo(() => {
        if (favoriteGamesQuery.data && favoriteGamesQuery.data.length > 0) {
            return favoriteGamesQuery.data.map((entry) => entry.gameId);
        }

        return [];
    }, [favoriteGamesQuery.data]);
    const gamesQuery = useGames({
        gameIds: gamesIds,
        relations: {
            cover: true,
        },
    });

    const isFailed = favoriteGamesQuery.isError || gamesQuery.isError;

    const isEmpty =
        favoriteGamesQuery.data == undefined ||
        favoriteGamesQuery.data.length === 0 ||
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
