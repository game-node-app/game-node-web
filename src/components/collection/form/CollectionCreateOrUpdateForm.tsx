import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Stack, TextInput, Text, Switch } from "@mantine/core";
import buildAxiosInstance from "@/util/buildAxiosInstance";
import { useRouter } from "next/router";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useUserLibrary } from "@/components/library/hooks/useUserLibrary";
import { BaseModalChildrenProps } from "@/util/types/modal-props";
import { ApiError, CollectionsService } from "@/wrapper/server";
import { useCollection } from "@/components/collection/hooks/useCollection";
import { useMutation } from "react-query";

const CreateCollectionFormSchema = z
    .object({
        name: z.string().min(3).max(50),
        description: z.string().optional(),
        isPublic: z.boolean().default(true),
        isFeatured: z.boolean().default(false),
    })
    .refine(
        (data) => {
            return !(data.isFeatured && !data.isPublic);
        },
        {
            message: "Featured collections must be public",
            path: ["isFeatured"],
        },
    );

type CreateCollectionFormValues = z.infer<typeof CreateCollectionFormSchema>;

interface ICollectionCreateOrUpdateFormProps extends BaseModalChildrenProps {
    existingCollectionId?: string;
}

const CollectionCreateOrUpdateForm = ({
    onClose,
    existingCollectionId,
}: ICollectionCreateOrUpdateFormProps) => {
    const [requestError, setRequestError] = useState<string | undefined>(
        undefined,
    );
    const session = useSessionContext();
    const userId = session.loading ? undefined : session.userId;
    const userLibraryQuery = useUserLibrary(userId);

    const collectionQuery = useCollection(existingCollectionId, {});
    const existingCollection = collectionQuery.data;

    const { setValue, watch, handleSubmit, register, formState } =
        useForm<CreateCollectionFormValues>({
            resolver: zodResolver(CreateCollectionFormSchema),
            mode: "onChange",
        });

    const router = useRouter();

    useEffect(() => {
        const possibleKeys = Object.keys(
            CreateCollectionFormSchema.innerType().shape,
        );
        if (existingCollection != undefined) {
            for (const [key, value] of Object.entries(existingCollection)) {
                if (possibleKeys.includes(key)) {
                    setValue(key as any, value);
                }
            }
        }
    }, [existingCollection, setValue]);

    const collectionMutation = useMutation({
        mutationFn: async (data: CreateCollectionFormValues) => {
            if (existingCollection != undefined) {
                await CollectionsService.collectionsControllerUpdate(
                    existingCollection.id,
                    data,
                );
                return;
            }
            await CollectionsService.collectionsControllerCreate(data);
        },
        onSuccess: () => {
            userLibraryQuery.invalidate();
            if (onClose) {
                onClose();
            }
        },
        onError: (error: ApiError) => {
            if (error.status === 401) {
                router.push("/auth");
            }
        },
    });

    return (
        <form
            className="w-full h-full"
            onSubmit={handleSubmit((data) => collectionMutation.mutate(data))}
        >
            <Stack gap="lg">
                <TextInput
                    withAsterisk
                    label={"Collection name"}
                    placeholder={"🎮 Playing now"}
                    {...register("name")}
                    error={formState.errors.name?.message}
                />
                <TextInput
                    label={"Description"}
                    placeholder={"Games I'm currently playing"}
                    {...register("description")}
                    error={formState.errors.description?.message}
                />
                <Switch
                    error={formState.errors.isPublic?.message}
                    label={"Public collection"}
                    description={
                        "If this collections is visible to other users"
                    }
                    defaultChecked={true}
                    {...register("isPublic")}
                />
                <Switch
                    error={formState.errors.isFeatured?.message}
                    label={"Featured collection"}
                    description={
                        "If this collections is featured in your profile and library"
                    }
                    defaultChecked={false}
                    {...register("isFeatured")}
                />
                <Button type="submit">
                    {existingCollection ? "Update" : "Create"}
                </Button>
                {collectionMutation.isError && (
                    <Text c="red" mt="md">
                        {collectionMutation.error.message}
                    </Text>
                )}
            </Stack>
        </form>
    );
};

export default CollectionCreateOrUpdateForm;
