/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateProfileDto } from '../models/UpdateProfileDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ProfileService {

    /**
     * @param formData
     * @returns any
     * @throws ApiError
     */
    public static profileControllerUpdate(
        formData: UpdateProfileDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/profile',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * Used to access own profile
     * @returns any
     * @throws ApiError
     */
    public static profileControllerFindOwnById(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profile',
        });
    }

    /**
     * Used to access other users' profiles
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static profileControllerFindOneById(
        id: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/profile/{id}',
            path: {
                'id': id,
            },
        });
    }

}
