/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Library } from '../models/Library';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LibrariesService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static librariesControllerFindByUserId(): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/libraries',
        });
    }

    /**
     * @param id
     * @returns Library
     * @throws ApiError
     */
    public static librariesControllerFindById(
        id: string,
    ): CancelablePromise<Library> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/libraries/{id}',
            path: {
                'id': id,
            },
        });
    }

}
