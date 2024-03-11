import React, { useEffect, useRef, useState } from "react";
import { Button, Stack, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
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
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

/**
 * TODO: Add share options
 */
const ShareFormSchema = z.object({});

type ShareFormValues = z.infer<typeof ShareFormSchema>;

interface GameInfoShareProps extends BaseModalChildrenProps {
    gameId: number;
}

const GameInfoShare = ({ gameId, onClose }: GameInfoShareProps) => {
    const form = useForm({
        mode: "onBlur",
        resolver: zodResolver(ShareFormSchema),
    });
    const canShare = navigator.canShare != undefined;

    const onSubmit = async () => {
        if (!canShare) {
            console.error("User's browser doesn't support the WebShare API.");
            return;
        }
        const node = document.getElementById(GAME_INFO_SHARE_PREVIEW_ID);
        setIsConversionLoading(true);
        const blob = await toBlob(node!);
        if (blob) {
            const now = new Date().getTime();
            const file = new File([blob], `gamenode-share-${gameId}-${now}`, {
                type: blob.type,
            });
            if (
                navigator.canShare({
                    files: [file],
                })
            ) {
                navigator.share({
                    files: [file],
                });
            }
        }
        setIsConversionLoading(false);
    };

    const [isConversionLoading, setIsConversionLoading] = useState(false);

    return (
        <Stack w={"100%"} align={"center"}>
            {!canShare && (
                <Text c={"red"} className={"mt-8 mb-8 text-center"}>
                    It seems like you browser doesn't support this feature.
                </Text>
            )}
            <DetailsBox
                title={"Preview"}
                stackProps={{
                    className: "",
                }}
                enabled={canShare}
            >
                <GameInfoSharePreview gameId={gameId} />
            </DetailsBox>
            <Button
                disabled={!canShare}
                loading={isConversionLoading}
                onClick={onSubmit}
            >
                Share
            </Button>
        </Stack>
    );
};

export default GameInfoShare;
