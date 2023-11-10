/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SearchGame } from './SearchGame';

export type GameSearchResponseHit = {
    /**
     * This is returned as a string from Manticore, but is converted before return to the client.
     */
    _id: number;
    _score: number;
    _source: SearchGame;
};

