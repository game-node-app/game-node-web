import React, { useMemo } from "react";
import { useGame } from "@/components/game/hooks/useGame";
import { DetailsBox } from "@/components/general/DetailsBox";
import { Skeleton, Text } from "@mantine/core";

interface IProps {
    gameId: number;
}

const GameInfoDetailsDeveloperInfo = ({ gameId }: IProps) => {
    const game = useGame(gameId, {
        relations: {
            involvedCompanies: {
                company: true,
            },
        },
    });
    const involvedCompanies = game.data?.involvedCompanies;
    const developers = useMemo(() => {
        if (involvedCompanies && involvedCompanies.length > 0) {
            return involvedCompanies
                .filter((ic) => ic.developer)
                .map((ic) => ic.company);
        }
        return undefined;
    }, [involvedCompanies]);
    const publishers = useMemo(() => {
        if (involvedCompanies && involvedCompanies.length > 0) {
            return involvedCompanies
                .filter((ic) => ic.publisher)
                .map((ic) => ic.company);
        }
    }, [involvedCompanies]);
    const developersNames = developers
        ?.map((company) => company.name)
        ?.join(", ");
    const publishersNames = publishers
        ?.map((company) => company.name)
        .join(", ");

    return (
        <>
            <DetailsBox
                title={"Developer(s)"}
                content={
                    game.isLoading ? (
                        <Skeleton className={"w-64 h-4"} />
                    ) : developersNames && developersNames.length > 0 ? (
                        developersNames
                    ) : undefined
                }
            />
            <DetailsBox
                title={"Publisher(s)"}
                content={
                    game.isLoading ? (
                        <Skeleton className={"w-64 h-4"} />
                    ) : publishersNames && publishersNames.length > 0 ? (
                        publishersNames
                    ) : undefined
                }
            />
        </>
    );
};

export default GameInfoDetailsDeveloperInfo;
