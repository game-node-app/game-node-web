/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectionEntry } from './CollectionEntry';
import type { Game } from './Game';
import type { Profile } from './Profile';
import type { ReviewStatistics } from './ReviewStatistics';

export type Review = {
    id: string;
    title: string;
    content: string;
    rating: number;
    game: Game;
    reviewStatistics: ReviewStatistics;
    collectionEntry: CollectionEntry;
    profile: Profile;
    createdAt: string;
    updatedAt: string;
};

