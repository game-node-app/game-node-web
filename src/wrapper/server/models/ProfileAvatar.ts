/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Profile } from './Profile';

export type ProfileAvatar = {
    id: number;
    mimetype: string;
    extension: string;
    size: number;
    filename: string;
    encoding: string;
    /**
     * Multer's File's destination + filename
     */
    path: string;
    profile: Profile;
    createdAt: string;
    updatedAt: string;
};

