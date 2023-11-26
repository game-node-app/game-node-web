import React, { useEffect, useRef, useState } from "react";
import GameInfoReviewEditor from "@/components/game/info/review/editor/GameInfoReviewEditor";
import { DetailsBox } from "@/components/general/DetailsBox";
import { z } from "zod";
import { CreateReviewDto, ReviewsService } from "@/wrapper/server";
import { Box, Button, Flex, Group, Rating, Stack, Text } from "@mantine/core";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Break from "@/components/general/Break";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useReviewForUserId from "@/components/review/hooks/useReviewForUserIdAndGameId";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import useUserId from "@/components/auth/hooks/useUserId";
import { notifications } from "@mantine/notifications";
import ReviewListItem from "@/components/review/view/ReviewListItem";
import { useCollectionEntriesForGameId } from "@/components/collection/collection-entry/hooks/useCollectionEntriesForGameId";

const ReviewFormSchema = z.object({
    rating: z.number().min(0).max(5).default(5),
    content: z.string().min(60),
});

export type TReviewFormValues = z.infer<typeof ReviewFormSchema>;

interface IGameInfoReviewEditorViewProps {
    gameId: number;
}

const GameInfoReviewEditorView = ({
    gameId,
}: IGameInfoReviewEditorViewProps) => {
    const [hasProfanity, setHasProfanity] = useState(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(true);
    const hasSetEditMode = useRef<boolean>(false);

    const { watch, handleSubmit, formState, setValue } =
        useForm<TReviewFormValues>({
            mode: "onSubmit",
            resolver: zodResolver(ReviewFormSchema),
            defaultValues: {
                rating: 5,
            },
        });
    const queryClient = useQueryClient();

    const userId = useUserId();
    const reviewQuery = useReviewForUserId(userId, gameId);
    const collectionEntriesQuery = useCollectionEntriesForGameId(gameId);
    const isGameInLibrary =
        collectionEntriesQuery.data != undefined &&
        collectionEntriesQuery.data.length > 0;
    const reviewMutation = useMutation({
        mutationFn: async (data: TReviewFormValues) => {
            await ReviewsService.reviewsControllerCreateOrUpdate({
                ...data,
                gameId: gameId,
            });
        },
        onSuccess: () => {
            reviewQuery.invalidate();
            notifications.show({
                title: "Success",
                message:
                    reviewQuery.data != undefined
                        ? "Review successfully updated!"
                        : "Review created!",
                color: "green",
            });
        },
        onError: () => {
            notifications.show({
                title: "Failed",
                message:
                    "We couldn't save your review. If this persists, please contact support.",
                color: "red",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["review"] });
        },
    });

    const rating = watch("rating");
    const error = formState.errors.content || formState.errors.rating;

    /**
     * Effect to synchronize isEditMode with reviewQuery.data
     */
    useEffect(() => {
        if (!hasSetEditMode.current && reviewQuery.data != undefined) {
            setIsEditMode(false);
            hasSetEditMode.current = true;
        }
    }, [isEditMode, reviewQuery.data]);

    const onSubmit = (data: TReviewFormValues) => {
        reviewMutation.mutate(data);
        reviewQuery.invalidate();
        setIsEditMode(false);
    };

    const render = () => {
        if (!isGameInLibrary) {
            return (
                <Text>
                    You need to have this game in your library to review it.
                </Text>
            );
        }
        if (!isEditMode && reviewQuery.data != undefined) {
            return (
                <ReviewListItem
                    review={reviewQuery.data}
                    onEditStart={() => setIsEditMode(true)}
                />
            );
        }

        return (
            <form className={"w-full h-full"} onSubmit={handleSubmit(onSubmit)}>
                <GameInfoReviewEditor
                    gameId={gameId}
                    onBlur={(v) => setValue("content", v)}
                    setHasProfanity={setHasProfanity}
                />
                <Break />
                <Group mt={"md"} justify={"space-between"}>
                    <Text
                        fz={"sm"}
                        ml={{ base: 0, lg: "0.5rem" }}
                        className={"text-red-500"}
                    >
                        {error?.message}
                    </Text>
                    <Group>
                        <Rating
                            defaultValue={5}
                            value={rating}
                            onChange={(v) => setValue("rating", v)}
                        />
                        <Button type={"submit"}>Submit</Button>
                    </Group>
                </Group>
            </form>
        );
    };

    return (
        <Flex wrap={"wrap"} w={"100%"} h={"100%"} justify={"start"}>
            {render()}
        </Flex>
    );
};

export default GameInfoReviewEditorView;
