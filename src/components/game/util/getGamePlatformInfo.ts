import { TGameOrSearchGame } from "@/components/game/util/types";
import { isGameSearchObject } from "@/components/game/util/isGameObject";

interface IGamePlatformInfo {
    platformsNames: string[] | undefined;
    platformsAbbreviations: string[] | undefined;
}

export function getGamePlatformInfo(
    game: TGameOrSearchGame,
): IGamePlatformInfo {
    const platformInfo: IGamePlatformInfo = {
        platformsNames: undefined,
        platformsAbbreviations: undefined,
    };

    if (isGameSearchObject(game)) {
        if (game.platformsNames) {
            platformInfo.platformsNames = game.platformsNames.split(", ");
        }
        if (game.platformsAbbreviations) {
            platformInfo.platformsAbbreviations =
                game.platformsAbbreviations.split(", ");
        }
    } else if (!isGameSearchObject(game)) {
    }

    return platformInfo;
}
