/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActivityStatistics } from './ActivityStatistics';
import type { GameStatistics } from './GameStatistics';

export type UserView = {
    id: number;
    userId?: string;
    gameStatistics: GameStatistics;
    activityStatistics: ActivityStatistics;
    createdAt: string;
    updatedAt: string;
};

