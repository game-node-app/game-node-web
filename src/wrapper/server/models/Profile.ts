/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ProfileAvatar } from './ProfileAvatar';

export type Profile = {
    /**
     * Shareable string ID
     *
     * Same as SuperTokens' userId.
     */
    userId: string;
    username: string;
    avatar: ProfileAvatar;
    createdAt: string;
    updatedAt: string;
};

