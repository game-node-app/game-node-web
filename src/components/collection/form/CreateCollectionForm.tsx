import React, { useEffect, useState } from "react";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Stack, TextInput, Text, Switch } from "@mantine/core";
import buildAxiosInstance from "@/util/buildAxiosInstance";
import useUserInfo from "@/hooks/useUserInfo";
import { useRouter } from "next/router";

const CreateCollectionFormSchema = z.object({
    name: z.string().min(3).max(50),
    description: z.string().min(3).max(300),
    isPublic: z.boolean().default(true),
    isFavoritesCollection: z.boolean(),
});

type CreateCollectionFormValues = z.infer<typeof CreateCollectionFormSchema>;

const CreateCollectionForm = ({ postSubmit }: IBaseFormProps) => {
    const [requestError, setRequestError] = useState<string | undefined>(
        undefined,
    );
    const userInfo = useUserInfo();
    const { handleSubmit, register, formState } =
        useForm<CreateCollectionFormValues>({
            resolver: zodResolver(CreateCollectionFormSchema),
            mode: "onBlur",
        });
    const router = useRouter();

    const onSubmit = async (data: CreateCollectionFormValues) => {
        const axios = buildAxiosInstance();
        try {
            setRequestError(undefined);
            await axios.post("/collections", data);
            userInfo.invalidateUserLibraryCache();
            if (postSubmit) {
                postSubmit(data);
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
                    case 409:
                        setRequestError(
                            "You already have a favorites collection set.",
                        );
                        break;
                }
            }
        }
    };

    useEffect(() => {
        if (userInfo.userLibrary == undefined) {
            router.push("/auth");
        }
    });

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
                    label={"Public collection"}
                    description={
                        "If this collections is visible to other users"
                    }
                    defaultChecked={true}
                    {...register("isPublic")}
                />
                <Switch
                    label={"Favorites collection"}
                    description={
                        "Your favorite games collection show up at the start of your profile page."
                    }
                    defaultChecked={false}
                    {...register("isFavoritesCollection")}
                />
                <Button type="submit">Create</Button>
                {requestError && (
                    <Text color="red" mt="md">
                        {requestError}
                    </Text>
                )}
            </Stack>
        </form>
    );
};

export default CreateCollectionForm;
