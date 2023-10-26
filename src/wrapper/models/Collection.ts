/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionEntry } from './CollectionEntry';
import type { Library } from './Library';

export type Collection = {
    id: string;
    name: string;
    description: string;
    isPublic: boolean;
    library: Library;
    entries: Array<CollectionEntry>;
    isFavoritesCollection: boolean;
    createdAt: string;
    updatedAt: string;
};

