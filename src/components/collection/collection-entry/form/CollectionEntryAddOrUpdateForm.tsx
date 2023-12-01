//@ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    ComboboxItem,
    MultiSelect,
    Select,
    Space,
    Title,
} from "@mantine/core";
import GameFigureImage from "@/components/game/figure/GameFigureImage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { notifications } from "@mantine/notifications";
import {
    Collection,
    CollectionsEntriesService,
    GamePlatform,
    GameRepositoryService,
} from "@/wrapper/server";
import { useGame } from "@/components/game/hooks/useGame";
import { ImageSize } from "@/components/game/util/getSizedImageUrl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import { useOwnCollectionEntryForGameId } from "@/components/collection/collection-entry/hooks/useOwnCollectionEntryForGameId";
import {
    SessionAuth,
    useSessionContext,
} from "supertokens-auth-react/recipe/session";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import useGamePlatforms from "@/components/game/hooks/useGamePlatforms";
import useUserId from "@/components/auth/hooks/useUserId";

const GameAddOrUpdateSchema = z.object({
    collectionIds: z
        .array(z.string())
        .min(1, "Select at least one collection.")
        .default([]),
    platformsIds: z
        .array(z.string())
        .min(1, "Select at least one platform.")
        .default([]),
});

type TGameAddOrUpdateValues = z.infer<typeof GameAddOrUpdateSchema>;

interface IGameAddFormProps extends BaseModalChildrenProps {
    gameId: number;
}

function buildCollectionOptions(
    collections: Collection[] | undefined,
): ComboboxItem[] {
    if (collections == undefined || collections.length === 0) {
        return undefined;
    }

    return collections.map((collection) => {
        return {
            label: collection.name,
            value: collection.id,
            enabled: true,
        };
    });
}

function buildPlatformsOptions(
    platforms: GamePlatform[] | undefined,
): ComboboxItem[] | undefined {
    if (platforms == undefined || platforms.length === 0) return undefined;
    return platforms
        .filter(
            (platform) =>
                platform.abbreviation != undefined ||
                platform.name != undefined,
        )
        .map((platform) => {
            return {
                label: platform.abbreviation ?? platform.name,
                value: `${platform.id}`,
            };
        });
}

const CollectionEntryAddOrUpdateForm = ({
    gameId,
    onClose,
}: IGameAddFormProps) => {
    const {
        watch,
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<TGameAddOrUpdateValues>({
        mode: "onSubmit",
        resolver: zodResolver(GameAddOrUpdateSchema),
    });

    const queryClient = useQueryClient();

    const collectionEntryQuery = useOwnCollectionEntryForGameId(gameId);

    const gameQuery = useGame(gameId, {
        relations: {
            cover: true,
            platforms: true,
        },
    });
    const gamePlatformsQuery = useGamePlatforms();

    const game = gameQuery.data;
    const userId = useUserId();

    const userLibraryQuery = useUserLibrary(userId);

    const collectionOptions = useMemo(() => {
        return buildCollectionOptions(userLibraryQuery?.data?.collections);
    }, [userLibraryQuery?.data?.collections]);

    const platformOptions = useMemo(() => {
        if (game && game.platforms != undefined && game.platforms.length > 0) {
            return buildPlatformsOptions(game.platforms);
        }
        return buildPlatformsOptions(gamePlatformsQuery.data);
    }, [game, gamePlatformsQuery.data]);

    const isUpdateAction = collectionEntryQuery.data != null;

    const collectionEntryMutation = useMutation({
        mutationFn: async (data: TGameAddOrUpdateValues) => {
            const collectionIds = data.collectionIds;
            const parsedPlatformIds = data.platformsIds.map((id) =>
                parseInt(id),
            );
            const isFavorite =
                isUpdateAction &&
                collectionEntryQuery.data != undefined &&
                collectionEntryQuery.data.isFavorite;

            await CollectionsEntriesService.collectionsEntriesControllerCreate({
                collectionIds: collectionIds,
                gameId: gameId,
                platformIds: parsedPlatformIds,
                isFavorite: isFavorite,
            });
        },
        onSettled: () => {
            collectionEntryQuery.invalidate();
            queryClient.invalidateQueries(["review"]).then();
        },
        onSuccess: () => {
            notifications.show({
                title: "Success",
                message: isUpdateAction
                    ? "Game updated on your library!"
                    : "Game added to your library!",
                color: "green",
            });

            if (onClose) {
                onClose();
            }
        },
        onError: () => {
            notifications.show({
                title: "Error",
                message: "Something went wrong!",
                color: "red",
            });
        },
    });

    const onSubmit = async (data: TGameAddOrUpdateValues) => {
        collectionEntryMutation.mutate(data);
    };

    /**
     * Effect to sync with user's collection data.
     */
    useEffect(() => {
        if (collectionEntryQuery.data != undefined) {
            const collectionIds = collectionEntryQuery.data.collections.map(
                (collection) => collection.id,
            );

            if (platformOptions && platformOptions.length > 0) {
                const platformIds =
                    collectionEntryQuery.data.ownedPlatforms.map(
                        (platform) => platform.id,
                    );
                const uniquePlatformIds = Array.from(new Set(platformIds));
                setValue(
                    "platformsIds",
                    uniquePlatformIds.map((v) => `${v}`),
                );
            }
            setValue("collectionIds", collectionIds);
        }
    }, [collectionEntryQuery.data, platformOptions, setValue]);

    const platformsIdsValue = watch("platformsIds", []);
    const collectionsIdsValue = watch("collectionIds", []);

    if (game == undefined) {
        return null;
    }

    return (
        <SessionAuth>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full h-full flex flex-col items-center justify-start gap-4"
            >
                <Box className="min-w-[100%] max-w-fit max-h-fit">
                    <GameFigureImage game={game} size={ImageSize.COVER_BIG} />
                </Box>
                <Title align={"center"} size={"h5"}>
                    {game.name}
                </Title>
                <Space />

                <MultiSelect
                    {...register("collectionIds")}
                    value={collectionsIdsValue || []}
                    className={"w-full"}
                    data={collectionOptions}
                    onChange={(value) => {
                        setValue("collectionIds", value);
                    }}
                    placeholder={"Select collections"}
                    label={"Collections"}
                    error={errors.collectionIds?.message}
                    withAsterisk
                    searchable
                    limit={10}
                    description={"Which collections do you want to save it on?"}
                />
                <Space />
                <MultiSelect
                    {...register("platformsIds")}
                    value={platformsIdsValue || []}
                    className={"w-full"}
                    data={platformOptions}
                    onChange={(value) => {
                        setValue("platformsIds", value);
                    }}
                    searchable
                    placeholder={"Select platforms"}
                    label={"Platforms"}
                    error={errors.platformsIds?.message}
                    withAsterisk
                    limit={20}
                    description={"Which platforms do you own this game on?"}
                />
                <Button type={"submit"}>
                    {isUpdateAction ? "Update" : "Add"}
                </Button>
            </form>
        </SessionAuth>
    );
};

export default CollectionEntryAddOrUpdateForm;
