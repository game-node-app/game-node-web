/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Collection } from './Collection';
import type { Game } from './Game';
import type { GamePlatform } from './GamePlatform';
import type { Review } from './Review';

export type CollectionEntry = {
    id: string;
    review?: Review | null;
    reviewId: string | null;
    collection: Collection;
    game: Game;
    /**
     * The platforms on which the user owns the game.
     */
    ownedPlatforms: Array<GamePlatform>;
    isFavorite: boolean;
    createdAt: string;
    updatedAt: string;
};

