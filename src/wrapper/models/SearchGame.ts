/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type SearchGame = {
    coverUrl?: string;
    numViews?: number;
    numLikes?: number;
    genresNames?: string;
    platformsNames?: string;
    platformsAbbreviations?: string;
    keywordsNames?: string;
    source: SearchGame.source;
    /**
     * Should be mapped to the IGDB ID of the game.
     */
    id: number;
    name: string;
    slug: string;
    summary: string;
    storyline: string;
    checksum: string;
    aggregatedRating?: number;
    aggregatedRatingCount?: number;
    category: SearchGame.category;
    status: SearchGame.status;
    firstReleaseDate: string;
    createdAt: string;
    updatedAt: string;
};

export namespace SearchGame {

    export enum source {
        MYSQL = 'MYSQL',
        MANTICORE = 'MANTICORE',
    }

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


}

