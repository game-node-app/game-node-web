import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Chip, Group, Stack, Text } from "@mantine/core";
import { FieldPath, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    BaseModalChildrenProps,
    BaseModalProps,
} from "@/util/types/modal-props";
import GameInfoSharePreview, {
    GAME_INFO_SHARE_PREVIEW_ID,
} from "@/components/game/info/share/GameInfoSharePreview";
import { DetailsBox } from "@/components/general/DetailsBox";
import { toBlob } from "html-to-image";
import { useMutation } from "@tanstack/react-query";
import CenteredErrorMessage from "@/components/general/CenteredErrorMessage";

interface GameInfoShareProps extends BaseModalChildrenProps {
    gameId: number;
}

const ShareFormSchema = z.object({
    withRating: z.boolean().default(true),
    withOwnedPlatforms: z.boolean().default(true),
    transparentBackground: z.boolean().default(false),
    withDivider: z.boolean().default(true),
});

export type ShareFormValues = z.infer<typeof ShareFormSchema>;

const GameInfoShare = ({ gameId, onClose }: GameInfoShareProps) => {
    const canShare = navigator.canShare != undefined;

    const { watch, register, setValue, handleSubmit } =
        useForm<ShareFormValues>({
            mode: "onBlur",
            resolver: zodResolver(ShareFormSchema),
            defaultValues: {
                transparentBackground: false,
                withRating: true,
                withOwnedPlatforms: true,
                withDivider: true,
            },
        });

    const shareMutation = useMutation({
        mutationFn: async () => {
            if (!canShare) {
                console.error(
                    "User's browser doesn't support the WebShare API.",
                );
                throw new Error(
                    "Failed to generate final image: Browser not compatible.",
                );
            }
            const node = document.getElementById(GAME_INFO_SHARE_PREVIEW_ID);
            const blob = await toBlob(node!);
            if (!blob) {
                throw new Error("Failed to generate final image.");
            }
            // The blob always has 'image/jpeg' has mimetype.
            const extension = "jpeg";
            const filename = `gamenode-${gameId}.${extension}`;
            const file = new File([blob], filename, {
                type: blob.type,
            });
            const toShare: ShareData = {
                title: "GameNode Share",
                text: `See more at https://gamenode.app/game/${gameId}`,
                files: [file],
                url: `https://gamenode.app/game/${gameId}`,
            };
            if (navigator.canShare(toShare)) {
                console.log("This browser can share using WebShareAPI.");
                try {
                    await navigator.share(toShare);
                } catch (e) {
                    console.error(e);
                }
            }
        },
    });

    const registerChip = (fieldName: FieldPath<ShareFormValues>) => {
        return {
            checked: watch(fieldName),
            onChange: (v: boolean) => setValue(fieldName, v),
        } as const;
    };

    if (!canShare) {
        return (
            <Stack w={"100%"}>
                <CenteredErrorMessage
                    message={
                        "It seems like you browser doesn't support this feature."
                    }
                />
            </Stack>
        );
    }

    return (
        <form
            className={"w-full h-full"}
            onSubmit={handleSubmit(() => {
                shareMutation.mutate();
            })}
        >
            <Stack w={"100%"} align={"center"}>
                {shareMutation.isError && (
                    <Text c={"red"} className={"mt-8 mb-8 text-center"}>
                        {shareMutation.error.message}
                    </Text>
                )}
                <DetailsBox
                    enabled={canShare}
                    title={"Preview"}
                    stackProps={{ className: "" }}
                >
                    <GameInfoSharePreview
                        gameId={gameId}
                        watchFormValues={watch}
                    />
                </DetailsBox>

                <Group w={"100%"} className={"mt-4 mb-4"}>
                    <Chip {...registerChip("withRating")}>Rating</Chip>
                    <Chip {...registerChip("withOwnedPlatforms")}>
                        Owned platforms
                    </Chip>
                    <Chip {...registerChip("withDivider")}>Divider</Chip>
                    <Chip {...registerChip("transparentBackground")}>
                        Transparent background
                    </Chip>
                </Group>

                <Button
                    disabled={!canShare}
                    loading={shareMutation.isPending}
                    type={"submit"}
                >
                    Share
                </Button>
            </Stack>
        </form>
    );
};

export default GameInfoShare;
