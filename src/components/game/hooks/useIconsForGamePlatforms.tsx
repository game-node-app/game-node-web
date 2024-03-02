import { GamePlatform, GameRepositoryService } from "@/wrapper/server";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Image, Skeleton } from "@mantine/core";
import { getServerStoredIcon } from "@/util/getServerStoredImages";

export function useIconsForGamePlatforms(platforms?: GamePlatform[]) {
    const iconsQuery = useQuery({
        queryKey: ["game", "platform", "icon", platforms],
        queryFn: () => {
            if (!platforms) return [];
            const abbreviations = platforms
                .map((platform) => platform?.abbreviation)
                .filter((abbreviation) => abbreviation != undefined);
            try {
                return GameRepositoryService.gameRepositoryControllerGetIconNamesForPlatformAbbreviations(
                    {
                        platformAbbreviations: abbreviations,
                    },
                );
            } catch (e) {
                console.error(e);
                return [];
            }
        },
    });

    const icons = useMemo(() => {
        const icons = iconsQuery.data;
        if (iconsQuery.isLoading)
            return new Array(4).fill(0).map((_, i) => {
                return <Skeleton key={i} className={"h-[40px] w-[56px]"} />;
            });
        if (!icons) return null;
        return icons.map((icon) => {
            return (
                <Image
                    key={icon}
                    w={60}
                    alt={icon}
                    src={getServerStoredIcon(icon)}
                />
            );
        });
    }, [iconsQuery.data, iconsQuery.isLoading]);
    const isEmpty = icons == undefined || icons.length === 0;

    return [icons, isEmpty] as const;
}
