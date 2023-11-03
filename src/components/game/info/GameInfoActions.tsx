import React, { useEffect, useMemo, useState } from "react";
import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import { IconHeartFilled, IconHeartPlus, IconX } from "@tabler/icons-react";
import CollectionEntryAddOrUpdateModal from "@/components/collection/collection-entry/form/modal/CollectionEntryAddOrUpdateModal";
import { useDisclosure } from "@mantine/hooks";
import { CollectionsEntriesService, Game } from "@/wrapper";
import { useMutation, useQuery } from "react-query";
import { useCollectionEntriesForGameId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForGameId";
import CollectionEntryRemoveModal from "@/components/collection/collection-entry/form/modal/CollectionEntryRemoveModal";

interface IGameViewActionsProps {
    wrapperProps?: React.ComponentPropsWithoutRef<typeof Group>;
    game: Game | undefined;
}

/**
 * Component that handles the library-related actions for a game.
 * The game add modal is handled here.
 * @constructor
 */
const GameInfoActions = ({ game, wrapperProps }: IGameViewActionsProps) => {
    const [addUpdateModalOpened, addUpdateModalUtils] = useDisclosure();
    const [removeModalOpened, removeModalUtils] = useDisclosure();

    const collectionEntriesQuery = useCollectionEntriesForGameId(
        game?.id ?? -1,
    );
    const collectionEntryFavoriteMutation = useMutation({
        mutationFn: (gameId: number) => {
            return CollectionsEntriesService.collectionsEntriesControllerChangeFavoriteStatus(
                gameId,
                {
                    isFavorite: !gameInFavorites,
                },
            );
        },
        onSuccess: () => {
            collectionEntriesQuery.refetch();
        },
    });

    const gameInLibrary =
        collectionEntriesQuery.data != undefined &&
        collectionEntriesQuery.data.length > 0;

    const gameInFavorites =
        gameInLibrary &&
        collectionEntriesQuery.data!.some((entry) => entry.isFavorite);

    if (game == undefined) {
        return null;
    }

    return (
        <Group gap={"0.725rem"} {...wrapperProps}>
            <CollectionEntryAddOrUpdateModal
                opened={addUpdateModalOpened}
                onClose={addUpdateModalUtils.close}
                id={game.id}
            />
            <CollectionEntryRemoveModal
                opened={removeModalOpened}
                onClose={removeModalUtils.close}
                id={game.id}
            />
            <Button onClick={addUpdateModalUtils.open}>
                {gameInLibrary ? "Update" : "Add to library"}
            </Button>

            <Tooltip label={"Add to your favorites"}>
                <ActionIcon
                    size="lg"
                    variant="default"
                    disabled={!gameInLibrary}
                    onClick={() => {
                        collectionEntryFavoriteMutation.mutate(game.id);
                    }}
                >
                    {gameInFavorites ? (
                        <IconHeartFilled size={"1.05rem"} />
                    ) : (
                        <IconHeartPlus size={"1.05rem"} />
                    )}
                </ActionIcon>
            </Tooltip>

            {gameInLibrary && (
                <Tooltip label={"Remove from your library"}>
                    <ActionIcon
                        variant="default"
                        size="lg"
                        onClick={removeModalUtils.open}
                    >
                        <IconX color="red" />
                    </ActionIcon>
                </Tooltip>
            )}
        </Group>
    );
};

export default GameInfoActions;
