import React, { useMemo } from "react";
import { useCollectionEntriesForCollectionId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForCollectionId";
import { z, ZodError, ZodIssueCode } from "zod";
import {
    ApiError,
    CancelablePromise,
    CollectionsEntriesService,
    CreateCollectionEntryDto,
    Game,
    GamePlatform,
} from "@/wrapper/server";
import {
    Button,
    Combobox,
    ComboboxItem,
    MultiSelect,
    Stack,
    Text,
    TextInput,
    Title,
    useCombobox,
} from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserId from "@/components/auth/hooks/useUserId";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

const CollectionEntriesMoveFormSchema = z.object({
    gameIds: z.array(z.number()).min(1).default([]),
    targetCollectionIds: z.array(z.string()),
});

type CollectionEntriesMoveFormValues = z.infer<
    typeof CollectionEntriesMoveFormSchema
>;
interface ISelectionOptionProps {
    game: Game;
    ownedPlatforms: GamePlatform[];
}
const SelectionOption = ({ game, ownedPlatforms }: ISelectionOptionProps) => {
    const ownedPlatformsNames = ownedPlatforms.map((p) => p.name).join(", ");
    return (
        <Combobox.Option value={`${game.id}`}>
            <Stack>
                <Text fz={"sm"}>{game.name}</Text>
                <Text fz={"xs"}>{ownedPlatformsNames}</Text>
            </Stack>
        </Combobox.Option>
    );
};

interface ICollectionEntriesMoveFormProps extends BaseModalChildrenProps {
    collectionId: string;
}
/**
 * Form responsible for moving collection entries between collections.
 * Similar to CollectionEntryAddOrUpdateForm, except that this one offers multiple games as input.
 * @constructor
 */
const CollectionEntriesMoveForm = ({
    collectionId,
    onClose,
}: ICollectionEntriesMoveFormProps) => {
    const { register, handleSubmit, setValue, watch, formState, setError } =
        useForm<CollectionEntriesMoveFormValues>({
            mode: "onSubmit",
            resolver: zodResolver(CollectionEntriesMoveFormSchema),
        });
    const userId = useUserId();
    const libraryQuery = useUserLibrary(userId);
    const collectionsEntriesQuery = useCollectionEntriesForCollectionId({
        collectionId,
    });
    const gamesSelectOptions = useMemo<ComboboxItem[] | undefined>(():
        | ComboboxItem[]
        | undefined => {
        if (
            collectionsEntriesQuery.data == undefined ||
            collectionsEntriesQuery.data.data == undefined ||
            collectionsEntriesQuery.data.data.length === 0
        ) {
            return undefined;
        }
        return collectionsEntriesQuery.data.data.map((entry) => {
            const game = entry.game;
            return {
                value: `${game.id}`,
                label: game.name,
            };
        });
    }, [collectionsEntriesQuery.data]);

    const collectionsSelectOptions = useMemo<ComboboxItem[] | undefined>(() => {
        if (
            libraryQuery.data == undefined ||
            libraryQuery.data.collections == undefined ||
            libraryQuery.data.collections.length === 0
        ) {
            return undefined;
        }
        return libraryQuery.data.collections
            .filter((collection) => collection.id !== collectionId)
            .map((collection) => {
                return {
                    label: collection.name,
                    value: collection.id,
                };
            });
    }, [collectionId, libraryQuery.data]);

    const collectionsMutation = useMutation({
        mutationFn: (data: CollectionEntriesMoveFormValues) => {
            const gameIds = data.gameIds;
            const targetCollectionsIds = data.targetCollectionIds;
            const relevantCollectionEntries =
                collectionsEntriesQuery.data?.data.filter((entry) => {
                    return (
                        entry.game != undefined &&
                        gameIds.includes(entry.game.id)
                    );
                });
            if (
                relevantCollectionEntries == undefined ||
                relevantCollectionEntries.length === 0
            ) {
                return Promise.reject(
                    "Relevant collection entry filtering is failing. Contact support.",
                );
            }

            const promises: Promise<CancelablePromise<any>>[] = [];
            for (const entry of relevantCollectionEntries) {
                const ownedPlatformsIds = entry.ownedPlatforms.map(
                    (platform) => platform.id,
                );
                const replacePromise =
                    CollectionsEntriesService.collectionsEntriesControllerReplace(
                        {
                            isFavorite: entry.isFavorite,
                            platformIds: ownedPlatformsIds as unknown as any,
                            collectionIds: targetCollectionsIds,
                            gameId: entry.game.id,
                        },
                    );
                promises.push(replacePromise);
            }
            return Promise.all(promises);
        },
        onSuccess: (data, variables, context) => {
            const movedItemsLength = variables.gameIds.length;
            notifications.show({
                message: `Sucessfully moved ${movedItemsLength} games!`,
                autoClose: 3000,
                color: "green",
            });
            if (onClose) onClose();
        },
        onSettled: () => {
            return collectionsEntriesQuery.invalidate();
        },
    });

    return (
        <form
            className={"w-full h-full"}
            onSubmit={handleSubmit((data) => collectionsMutation.mutate(data))}
        >
            <Stack w={"100%"} h={"100%"} p={0} align={"center"}>
                <MultiSelect
                    w={"100%"}
                    data={gamesSelectOptions}
                    label={"Games to move"}
                    description={"Select which games you want to move"}
                    searchable
                    {...register("gameIds")}
                    onChange={(values) => {
                        const valuesNumbers = values.map((v) =>
                            Number.parseInt(v),
                        );
                        setValue("gameIds", valuesNumbers);
                    }}
                    error={formState.errors.gameIds?.message}
                />
                <MultiSelect
                    mt={"1rem"}
                    w={"100%"}
                    data={collectionsSelectOptions}
                    label={"Target collections"}
                    searchable
                    description={
                        "Collections in which collection you want to insert these games"
                    }
                    error={formState.errors.targetCollectionIds?.message}
                    {...register("targetCollectionIds")}
                    onChange={(values) => {
                        setValue("targetCollectionIds", values);
                    }}
                />
                <Button type={"submit"}>Submit</Button>
            </Stack>
        </form>
    );
};

export default CollectionEntriesMoveForm;
