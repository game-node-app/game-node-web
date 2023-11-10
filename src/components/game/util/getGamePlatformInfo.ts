import { TGameOrSearchGame } from "@/components/game/util/types";
import {
    isGameObject,
    isGameSearchObject,
} from "@/components/game/util/isGameObject";

export interface IGamePlatformInfo {
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
    } else if (isGameObject(game)) {
        if (game.platforms) {
            platformInfo.platformsNames = game.platforms.map(
                (platform) => platform.name,
            );
            platformInfo.platformsAbbreviations = game.platforms.map(
                (platform) => platform.abbreviation,
            );
        }
    }

    return platformInfo;
}
