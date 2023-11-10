/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Activity } from './Activity';
import type { UserLike } from './UserLike';
import type { UserView } from './UserView';

export type ActivityStatistics = {
    activityId: string;
    views: Array<UserView>;
    likes: Array<UserLike>;
    activity: Activity;
    createdAt: string;
    updatedAt: string;
};

