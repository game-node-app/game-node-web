/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Collection } from './Collection';

export type Library = {
    /**
     * Also used to share the library with other users.
     *
     * Same as SuperTokens' userId.
     */
    userId: string;
    collections: Array<Collection>;
    createdAt: string;
    updatedAt: string;
};

