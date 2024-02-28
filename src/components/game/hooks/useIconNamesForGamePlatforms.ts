import { GamePlatform, GameRepositoryService } from "@/wrapper/server";
import { useQuery } from "@tanstack/react-query";

export function useIconNamesForGamePlatforms(platforms?: GamePlatform[]) {
    return useQuery({
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
}
