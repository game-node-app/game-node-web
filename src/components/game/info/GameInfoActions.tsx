import React, { useEffect, useMemo, useState } from "react";
import { ActionIcon, Button, Group, Stack, Tooltip, Text } from "@mantine/core";
import { IconHeartFilled, IconHeartPlus, IconX } from "@tabler/icons-react";
import CollectionEntryAddOrUpdateModal from "@/components/collection/collection-entry/form/modal/CollectionEntryAddOrUpdateModal";
import { useDisclosure } from "@mantine/hooks";
import { CollectionsEntriesService, Game } from "@/wrapper/server";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useOwnCollectionEntryForGameId } from "@/components/collection/collection-entry/hooks/useOwnCollectionEntryForGameId";
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

    const collectionEntryQuery = useOwnCollectionEntryForGameId(game?.id);

    const gameInLibrary =
        !collectionEntryQuery.isError && collectionEntryQuery.data != undefined;

    const gameInFavorites =
        gameInLibrary && collectionEntryQuery.data!.isFavorite;

    const invisibleFavoriteGame = useMemo(() => {
        if (collectionEntryQuery.data != undefined) {
            const gameOnlyInPrivateCollections =
                collectionEntryQuery.data.collections.every(
                    (collection) => !collection.isPublic,
                );
            return gameInFavorites && gameOnlyInPrivateCollections;
        }

        return false;
    }, [gameInFavorites, collectionEntryQuery.data]);

    const collectionEntryFavoriteMutation = useMutation({
        mutationFn: (gameId: number) => {
            return CollectionsEntriesService.collectionsEntriesControllerChangeFavoriteStatus(
                gameId,
                { isFavorite: !gameInFavorites },
            );
        },

        onSuccess: () => {
            collectionEntryQuery.invalidate();
        },
    });

    if (game == undefined) {
        return null;
    }

    return (
        <Stack align={"center"}>
            <Group gap={"0.725rem"} {...wrapperProps}>
                <CollectionEntryAddOrUpdateModal
                    opened={addUpdateModalOpened}
                    onClose={addUpdateModalUtils.close}
                    id={game.id}
                />
                <CollectionEntryRemoveModal
                    opened={removeModalOpened}
                    onClose={removeModalUtils.close}
                    gameId={game.id}
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
            {invisibleFavoriteGame && (
                <Text c={"dimmed"} fz={"sm"} className={"text-center"}>
                    This favorite game will not be shown in your public profile
                    because it's only included in private collections.
                </Text>
            )}
        </Stack>
    );
};

export default GameInfoActions;
