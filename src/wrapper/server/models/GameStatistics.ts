/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Game } from './Game';
import type { UserLike } from './UserLike';
import type { UserView } from './UserView';

export type GameStatistics = {
    id: number;
    game: Game;
    likes: Array<UserLike>;
    views: Array<UserView>;
    createdAt: string;
    updatedAt: string;
};

