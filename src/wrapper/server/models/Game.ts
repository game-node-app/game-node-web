/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GameAlternativeName } from './GameAlternativeName';
import type { GameArtwork } from './GameArtwork';
import type { GameCollection } from './GameCollection';
import type { GameCover } from './GameCover';
import type { GameExternalGame } from './GameExternalGame';
import type { GameFranchise } from './GameFranchise';
import type { GameGenre } from './GameGenre';
import type { GameKeyword } from './GameKeyword';
import type { GameLocalization } from './GameLocalization';
import type { GameMode } from './GameMode';
import type { GamePlatform } from './GamePlatform';
import type { GameScreenshot } from './GameScreenshot';

export type Game = {
    /**
     * Should be mapped to the IGDB ID of the game.
     */
    id: number;
    name: string;
    slug: string;
    aggregatedRating?: number;
    aggregatedRatingCount?: number;
    category: Game.category;
    status: Game.status;
    summary: string;
    storyline: string;
    checksum: string;
    url: string;
    firstReleaseDate: string;
    createdAt: string;
    updatedAt: string;
    dlcs?: Array<Game>;
    dlcOf?: Array<Game>;
    expansions?: Array<Game>;
    expansionOf?: Array<Game>;
    expandedGames?: Array<Game>;
    expandedGameOf?: Array<Game>;
    similarGames?: Array<Game>;
    similarGameOf?: Array<Game>;
    cover?: GameCover;
    collection?: GameCollection;
    alternativeNames?: Array<GameAlternativeName>;
    artworks?: Array<GameArtwork>;
    screenshots?: Array<GameScreenshot>;
    localizations?: Array<GameLocalization>;
    gameModes?: Array<GameMode>;
    genres?: Array<GameGenre>;
    keywords?: Array<GameKeyword>;
    franchises?: Array<GameFranchise>;
    platforms?: Array<GamePlatform>;
    externalGames?: Array<GameExternalGame>;
    /**
     * Oh dear maintainer, please forgive me for using transient fields.
     */
    source: Game.source;
};

export namespace Game {

    export enum category {
        '_0' = 0,
        '_1' = 1,
        '_2' = 2,
        '_3' = 3,
        '_4' = 4,
        '_5' = 5,
        '_6' = 6,
        '_7' = 7,
        '_8' = 8,
        '_9' = 9,
        '_10' = 10,
        '_11' = 11,
        '_12' = 12,
        '_13' = 13,
        '_14' = 14,
    }

    export enum status {
        '_0' = 0,
        '_2' = 2,
        '_3' = 3,
        '_4' = 4,
        '_5' = 5,
        '_6' = 6,
        '_7' = 7,
        '_8' = 8,
    }

    /**
     * Oh dear maintainer, please forgive me for using transient fields.
     */
    export enum source {
        MYSQL = 'MYSQL',
        MANTICORE = 'MANTICORE',
    }


}

