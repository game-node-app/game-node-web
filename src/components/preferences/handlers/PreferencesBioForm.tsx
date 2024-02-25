import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, Textarea, TextInput } from "@mantine/core";
import useUserProfile from "@/components/profile/hooks/useUserProfile";
import useUserId from "@/components/auth/hooks/useUserId";
import { useMutation } from "@tanstack/react-query";
import { ProfileService } from "@/wrapper/server";

const BioForm = z.object({
    bio: z.string().min(1).max(240),
});

type TBioForm = z.infer<typeof BioForm>;

const PreferencesBioForm = () => {
    const userId = useUserId();
    const profile = useUserProfile(userId);
    const { register, handleSubmit, formState } = useForm<TBioForm>({
        mode: "onBlur",
        resolver: zodResolver(BioForm),
    });
    const profileMutation = useMutation({
        mutationFn: (values: TBioForm) => {
            return ProfileService.profileControllerUpdate({
                bio: values.bio,
            });
        },
    });
    return (
        <form
            onSubmit={handleSubmit((values) => profileMutation.mutate(values))}
        >
            <Stack className={"w-full lg:w-2/5"}>
                <Textarea
                    {...register("bio")}
                    defaultValue={profile.data?.bio}
                ></Textarea>
                {formState.dirtyFields.bio && (
                    <Button type={"submit"}>Submit</Button>
                )}
            </Stack>
        </form>
    );
};

export default PreferencesBioForm;
