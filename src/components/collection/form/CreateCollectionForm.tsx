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
import { CollectionsService } from "@/wrapper";

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

const CreateCollectionForm = ({ onClose }: BaseModalChildrenProps) => {
    const [requestError, setRequestError] = useState<string | undefined>(
        undefined,
    );
    const session = useSessionContext();
    const userId = session.loading ? undefined : session.userId;
    const userLibraryQuery = useUserLibrary(userId);
    const { handleSubmit, register, formState } =
        useForm<CreateCollectionFormValues>({
            resolver: zodResolver(CreateCollectionFormSchema),
            mode: "onChange",
        });

    const router = useRouter();

    const onSubmit = async (data: CreateCollectionFormValues) => {
        const axios = buildAxiosInstance();
        try {
            setRequestError(undefined);
            await CollectionsService.collectionsControllerCreate(data as any);
            userLibraryQuery.invalidate();
            if (onClose) {
                onClose();
            }
        } catch (e: any) {
            console.error(e);
            if (e.response) {
                switch (e.response.status) {
                    case 400:
                        setRequestError(e.response.data.message);
                        break;
                    case 401:
                        setRequestError(
                            "You need to be logged in to create a collection.",
                        );
                        router.push("/auth");
                        break;
                }
            }
        }
    };

    return (
        <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
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
                <Button type="submit">Create</Button>
                {requestError && (
                    <Text c="red" mt="md">
                        {requestError}
                    </Text>
                )}
            </Stack>
        </form>
    );
};

export default CreateCollectionForm;
