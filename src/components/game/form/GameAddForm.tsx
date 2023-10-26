import React from "react";
import { Box, Button, MultiSelect, Space, Title } from "@mantine/core";
import GameFigureImage from "@/components/game/view/figure/GameFigureImage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IGameMetadata } from "@/util/types/metadata";
import { ICollection } from "@/util/types/collection";
import useUserInfo from "@/hooks/useUserInfo";
import { findEntryInLibrary } from "@/util/findInLibrary";
import buildAxiosInstance from "@/util/buildAxiosInstance";
import { notifications } from "@mantine/notifications";

const GameAddModalSchema = z.object({
    collectionIds: z.array(z.string()).min(1),
});

type TGameAddModalValues = z.infer<typeof GameAddModalSchema>;

interface IGameAddFormProps {
    metadata: IGameMetadata;
}

function buildCollectionLabels(collections: ICollection[] | undefined) {
    if (!collections) {
        return [];
    }

    return collections.map((collection) => {
        return {
            label: collection.name,
            value: collection.id,
        };
    });
}

const GameAddForm = ({ metadata }: IGameAddFormProps) => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<TGameAddModalValues>({
        mode: "onSubmit",
        resolver: zodResolver(GameAddModalSchema),
    });

    const userInfo = useUserInfo();
    const entryInLibrary = findEntryInLibrary(
        userInfo.userLibrary,
        metadata.igdbId,
    );
    const collectionLabels = buildCollectionLabels(
        userInfo.userLibrary?.collections,
    );

    const onSubmit = async (data: TGameAddModalValues) => {
        const collectionIds = data.collectionIds;
        const addPromises = [];
        const client = buildAxiosInstance();
        for (const collectionId of collectionIds) {
            const promise = client.post(`/collections/entries`, {
                collectionId,
                igdbId: metadata.igdbId,
            });
            addPromises.push(promise);
        }

        try {
            await Promise.all(addPromises);
            notifications.show({
                title: "Success",
                message: "Added to your library!",
                color: "green",
            });
        } catch (e: any) {
            notifications.show({
                title: "Error",
                message: "Something went wrong!",
                color: "red",
            });
        }

        userInfo.invalidateUserLibraryCache();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full flex flex-col items-center justify-start gap-4"
        >
            <Box className="min-w-[100%] max-w-fit max-h-fit">
                <GameFigureImage game={metadata} />
            </Box>
            <Title align={"center"} size={"h5"}>
                {metadata.name}
            </Title>
            <Space />

            <MultiSelect
                {...register("collectionIds")}
                data={collectionLabels}
                onChange={(value) => {
                    setValue("collectionIds", value);
                }}
                multiple
                placeholder={"Select collections"}
                label={"Collections"}
                error={errors.collectionIds?.message}
                withAsterisk
                description={"You can select multiple collections."}
            />
            <Space />
            <Button type={"submit"}>Add</Button>
        </form>
    );
};

export default GameAddForm;
