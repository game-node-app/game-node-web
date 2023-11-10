/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GameSearchRequestDto = {
    /**
     * The index to search in
     */
    index: GameSearchRequestDto.index;
    /**
     * The query to search for
     */
    query: Record<string, any>;
    fulltextFilter?: Record<string, any>;
    attrFilter?: Record<string, any>;
    limit?: number;
    offset?: number;
    maxMatches?: number;
    sort?: Array<Record<string, any>>;
    aggs?: Array<Record<string, any>>;
    expressions?: Array<Record<string, any>>;
    highlight?: Record<string, any>;
    profile?: boolean;
    trackScores?: boolean;
};

export namespace GameSearchRequestDto {

    /**
     * The index to search in
     */
    export enum index {
        GAMENODE = 'gamenode',
    }


}

