/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Review } from './Review';
import type { UserLike } from './UserLike';

export type ReviewStatistics = {
    reviewId: string;
    review: Review;
    likes: Array<UserLike>;
    createdAt: string;
    updatedAt: string;
};

