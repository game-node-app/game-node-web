/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActivityStatistics } from './ActivityStatistics';
import type { GameStatistics } from './GameStatistics';
import type { ReviewStatistics } from './ReviewStatistics';

export type UserLike = {
    id: number;
    userId: string;
    gameStatistics: GameStatistics;
    reviewStatistics: ReviewStatistics;
    activityStatistics: ActivityStatistics;
    createdAt: string;
    updatedAt: string;
};

