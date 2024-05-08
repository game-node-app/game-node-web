import { useRouter } from "next/router";
import { useImporterEntries } from "@/components/importer/hooks/useImporterEntries";
import {
    Box,
    Button,
    Center,
    Container,
    Flex,
    Group,
    Image,
    Paper,
    Skeleton,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { getServerStoredIcon } from "@/util/getServerStoredImages";
import ImporterCollectionSelect from "@/components/importer/ImporterCollectionSelect";
import useUserId from "@/components/auth/hooks/useUserId";
import { useGames } from "@/components/game/hooks/useGames";
import React, { useCallback, useEffect, useState } from "react";
import GameSelectView from "@/components/general/view/select/GameSelectView";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CollectionsEntriesService, GamePlatform } from "@/wrapper/server";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";

const ImporterFormSchema = z.object({
    selectedCollectionIds: z
        .array(z.string())
        .min(1, "Select at least one collection"),
    selectedGameIds: z.array(z.number()).min(1, "Select at least one game."),
    page: z.number().default(1),
});

type ImporterFormValues = z.infer<typeof ImporterFormSchema>;

const DEFAULT_LIMIT = 10;

const PC_PLATFORM_ID = 6;

function TypePage() {
    const router = useRouter();
    const { type } = router.query;

    const userId = useUserId();

    const userLibrary = useUserLibrary(userId);

    const { register, watch, handleSubmit, formState, setValue } =
        useForm<ImporterFormValues>({
            mode: "onSubmit",
            resolver: zodResolver(ImporterFormSchema),
            defaultValues: {
                page: 1,
                selectedCollectionIds: [],
                selectedGameIds: [],
            },
        });

    const selectedGameIds = watch("selectedGameIds");
    const selectedCollectionIds = watch("selectedCollectionIds");
    const page = watch("page");

    const [
        hasSelectedFinishedGamesCollection,
        setHasSelectedFinishedGamesCollection,
    ] = useState(false);

    const importerEntriesQuery = useImporterEntries({
        source: type as string,
        limit: DEFAULT_LIMIT,
        offset: (page - 1) * DEFAULT_LIMIT,
    });

    const gameIds = importerEntriesQuery.data?.data.map(
        (externalGame) => externalGame.gameId,
    );

    const gamesQuery = useGames(
        {
            gameIds,
            relations: {
                cover: true,
            },
        },
        true,
    );
    const isLoading = importerEntriesQuery.isLoading || gamesQuery.isLoading;
    const isError = importerEntriesQuery.isError || gamesQuery.isError;
    const isEmpty = isLoading || isError;

    const error = importerEntriesQuery.error || gamesQuery.error;

    const buildLoadingSkeletons = useCallback(() => {
        return new Array(5).fill(0).map((v, i) => {
            return <Skeleton key={i} className={"w-full h-60 mt-4"} />;
        });
    }, []);

    const handleSelection = (gameId: number, action: "select" | "deselect") => {
        const indexOfElement = selectedGameIds.indexOf(gameId);

        if (action === "deselect") {
            if (indexOfElement >= 0) {
                const updatedArray = selectedGameIds.toSpliced(
                    indexOfElement,
                    1,
                );
                setValue("selectedGameIds", updatedArray);
            }
            return;
        }
        // Item is already present in "select" action
        if (indexOfElement >= 0) {
            return;
        }

        setValue("selectedGameIds", selectedGameIds.concat([gameId]));
    };

    const importMutation = useMutation({
        mutationFn: async ({
            selectedCollectionIds,
            selectedGameIds,
        }: ImporterFormValues) => {
            for (const selectedGameId of selectedGameIds) {
                await CollectionsEntriesService.collectionsEntriesControllerCreateOrUpdate(
                    {
                        gameId: selectedGameId,
                        collectionIds: selectedCollectionIds,
                        platformIds: [PC_PLATFORM_ID],
                        isFavorite: false,
                    },
                );
            }
        },
    });

    useEffect(() => {
        if (
            userLibrary.data == undefined ||
            userLibrary.data.collections == undefined
        ) {
            return;
        }

        const hasSelected = userLibrary.data.collections.some((collection) => {
            return (
                collection.isFinished &&
                selectedCollectionIds.includes(collection.id)
            );
        });

        setHasSelectedFinishedGamesCollection(hasSelected);
    }, [
        hasSelectedFinishedGamesCollection,
        setHasSelectedFinishedGamesCollection,
        userLibrary.data,
        selectedCollectionIds,
    ]);

    console.log(hasSelectedFinishedGamesCollection);

    return (
        <Flex justify={"center"} mih={"100vh"} p={0} wrap={"wrap"}>
            <Paper className={"w-full lg:w-10/12 p-4"}>
                <form
                    className={"w-full h-full"}
                    onSubmit={handleSubmit((data) => {
                        importMutation.mutate(data);
                    })}
                >
                    <Group
                        className={"w-full border-[#302D2D] border-2 py-2 px-4"}
                    >
                        <Group className={"w-full lg:w-6/12 flex-nowrap"}>
                            <Image
                                src={getServerStoredIcon(type as string)}
                                w={48}
                                h={48}
                            />
                            <Stack gap={4}>
                                <Title size={"h4"}>
                                    GAME{" "}
                                    <span className={"text-[#F15025]"}>
                                        IMPORTER
                                    </span>
                                </Title>
                                <Text>
                                    Select one or multiple games which you want
                                    to bring to your GameNode library.
                                </Text>
                            </Stack>
                        </Group>
                        <Stack className={"w-full lg:ms-auto lg:w-4/12"}>
                            <ImporterCollectionSelect
                                userId={userId}
                                onChange={(values) => {
                                    setValue("selectedCollectionIds", values);
                                }}
                            />
                            {hasSelectedFinishedGamesCollection && (
                                <Text className={"text-sm text-yellow-300"}>
                                    Selected games will be marked as "Finished"
                                    because a collection for finished games has
                                    been selected. You can change the finish
                                    date later.
                                </Text>
                            )}
                        </Stack>
                        <Center w={"100%"}>
                            <Button
                                type={"submit"}
                                loading={importMutation.isPending}
                            >
                                Import
                            </Button>
                        </Center>
                    </Group>
                    <Stack w={"100%"} className={"mt-4"}>
                        <GameSelectView>
                            <GameSelectView.Content
                                items={gamesQuery.data!}
                                onSelected={(gameId) =>
                                    handleSelection(gameId, "select")
                                }
                                onDeselected={(gameId) => {
                                    handleSelection(gameId, "deselect");
                                }}
                            >
                                {isLoading && buildLoadingSkeletons()}
                            </GameSelectView.Content>
                            {!isEmpty && (
                                <GameSelectView.Pagination
                                    paginationInfo={
                                        importerEntriesQuery.data?.pagination
                                    }
                                    page={page}
                                    onPaginationChange={(selectedPage) => {
                                        setValue("page", selectedPage);
                                    }}
                                />
                            )}
                        </GameSelectView>
                    </Stack>
                </form>
            </Paper>
        </Flex>
    );
}

export default TypePage;
