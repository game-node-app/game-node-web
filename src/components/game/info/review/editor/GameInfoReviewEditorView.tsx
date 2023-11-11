import React from "react";
import GameInfoReviewEditor from "@/components/game/info/review/editor/GameInfoReviewEditor";
import { GameInfoDetailsBox } from "@/components/game/info/GameInfoDetailsBox";
import { z } from "zod";
import { CreateReviewDto } from "@/wrapper/server";
import { Button, Flex, Group, Rating, Stack } from "@mantine/core";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Break from "@/components/general/Break";

const ReviewFormSchema = z.object({
    rating: z.number().min(0).max(5),
    content: z.string(),
});

type TReviewFormValues = z.infer<typeof ReviewFormSchema>;

interface IGameInfoReviewEditorViewProps {
    gameId: number;
}

const GameInfoReviewEditorView = ({
    gameId,
}: IGameInfoReviewEditorViewProps) => {
    // const { watch, handleSubmit, formState, setValue } = useForm({
    //     mode: "onSubmit",
    //     resolver: zodResolver(ReviewFormSchema),
    // });
    // const rating = watch("rating");
    return (
        <Flex wrap={"wrap"} w={"100%"} h={"100%"}>
            <form className={"w-full h-full"}>
                <GameInfoReviewEditor gameId={gameId} />
                <Break />
                <Group justify={"space-around"}></Group>
            </form>
        </Flex>
    );
};

export default GameInfoReviewEditorView;
