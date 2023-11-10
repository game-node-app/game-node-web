/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActivityStatistics } from './ActivityStatistics';
import type { Profile } from './Profile';

export type Activity = {
    id: string;
    type: Activity.type;
    sourceId: string;
    /**
     * The associated profile with this Activity
     */
    profile: Profile;
    statistics: ActivityStatistics;
    createdAt: string;
    updatedAt: string;
};

export namespace Activity {

    export enum type {
        REVIEW = 'REVIEW',
        FOLLOW = 'FOLLOW',
        COLLECTION_ENTRY = 'COLLECTION_ENTRY',
    }


}

