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
import GameFigureImage from "@/components/game/view/figure/GameFigureImage";
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
import { useMutation, useQueryClient } from "react-query";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import { useCollectionEntriesForGameId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForGameId";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";

const GameAddOrUpdateSchema = z.object({
    collectionIds: z
        .array(z.string())
        .min(1, "Select at least one collection."),
    platformsIds: z.array(z.string()).min(1, "Select at least one platform."),
});

type TGameAddOrUpdateValues = z.infer<typeof GameAddOrUpdateSchema>;

interface IGameAddFormProps extends BaseModalChildrenProps {
    gameId: number;
}

function buildCollectionOptions(
    collections: Collection[] | undefined,
): ComboboxItem[] {
    if (!collections) {
        return [];
    }

    return collections.map((collection) => {
        return {
            label: collection.name,
            value: collection.id,
            enabled: true,
        };
    });
}

function buildPlatformsOptions(platforms: GamePlatform[]): ComboboxItem[] {
    return platforms.map((platform) => {
        return {
            label: platform.abbreviation ?? platform.name,
            value: platform.id,
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

    const collectionEntryQuery = useCollectionEntriesForGameId(gameId);

    const gameQuery = useGame(gameId, {
        relations: {
            platforms: true,
            cover: true,
        },
    });

    const game = gameQuery.data;
    const session = useSessionContext();

    const userLibraryQuery = useUserLibrary(
        session.loading ? undefined : session.userId,
    );

    const collectionOptions = buildCollectionOptions(
        userLibraryQuery?.data?.collections,
    );

    const isUpdateAction =
        collectionEntryQuery.data != undefined &&
        collectionEntryQuery.data.length > 0;

    const [platformOptions, setPlatformOptions] = useState<ComboboxItem[]>([]);

    const queryClient = useQueryClient();

    const collectionEntryMutation = useMutation({
        mutationFn: async (data: TGameAddOrUpdateValues) => {
            const collectionIds = data.collectionIds;
            const parsedPlatformIds = data.platformsIds.map((id) =>
                parseInt(id),
            );
            const isFavorite =
                isUpdateAction && collectionEntryQuery.data![0].isFavorite;

            await CollectionsEntriesService.collectionsEntriesControllerCreate({
                collectionIds: collectionIds,
                gameId: gameId,
                platformIds: parsedPlatformIds,
                isFavorite: isFavorite,
            });
        },
        onSuccess: () => {
            notifications.show({
                title: "Success",
                message: isUpdateAction
                    ? "Game updated on your library!"
                    : "Game added to your library!",
                color: "green",
            });
            queryClient.invalidateQueries(["collectionEntries", game.id]);
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
        await collectionEntryMutation.mutateAsync(data);
    };

    /**
     * Effect to use defaults when no platform data is available.
     */
    useEffect(() => {
        if (game.platforms == undefined || game.platforms.length === 0) {
            GameRepositoryService.gameRepositoryControllerGetDefaultPlatforms()
                .then((platforms) => {
                    console.log(platforms);
                    setPlatformOptions(buildPlatformsOptions(platforms));
                })
                .catch();
        } else if (game.platforms?.length > 0) {
            setPlatformOptions(buildPlatformsOptions(game.platforms));
        }
    }, [game?.platforms]);

    /**
     * Effect to sync with user's collection data.
     */
    useEffect(() => {
        if (
            collectionEntryQuery.data != undefined &&
            collectionEntryQuery.data.length > 0
        ) {
            const collectionIds = collectionEntryQuery.data
                .filter((entry) => entry.collection != undefined)
                .map((entry) => entry.collection.id);

            if (platformOptions.length > 0) {
                const platformIds = collectionEntryQuery.data.flatMap((entry) =>
                    entry.ownedPlatforms.map((platform) => platform.id),
                );
                const uniquePlatformIds = Array.from(new Set(platformIds));
                setValue("platformsIds", uniquePlatformIds);
            }

            /**
             * This is useful not only to avoid showing duplicates to the user, but also to
             * ensure consistency between collection entries.
             * See collections-entries.service.ts in game-node-server for more info.
             */
            setValue("collectionIds", collectionIds);
        }
    }, [collectionEntryQuery.data, platformOptions.length, setValue]);

    if (game == undefined) {
        return null;
    }

    const collectionIdsValue =
        watch("collectionIds", []).length > 0
            ? watch("collectionIds", [])
            : undefined;

    const platformIdsValue =
        watch("platformsIds", []).length > 0
            ? watch("platformsIds", [])
            : undefined;

    return (
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
                value={collectionIdsValue}
                className={"w-full"}
                data={collectionOptions}
                onChange={(value) => {
                    setValue("collectionIds", value);
                }}
                placeholder={"Select collections"}
                label={"Collections"}
                error={errors.collectionIds?.message}
                withAsterisk
                description={"Which collections do you want to save it on?"}
            />
            <Space />
            <MultiSelect
                {...register("platformsIds")}
                className={"w-full"}
                value={platformIdsValue}
                data={platformOptions}
                onChange={(value) => {
                    setValue("platformsIds", value);
                }}
                multiple
                placeholder={"Select platforms"}
                label={"Platforms"}
                error={errors.platformsIds?.message}
                withAsterisk
                description={"Which platforms do you own this game on?"}
            />
            <Button type={"submit"}>{isUpdateAction ? "Update" : "Add"}</Button>
        </form>
    );
};

export default CollectionEntryAddOrUpdateForm;
