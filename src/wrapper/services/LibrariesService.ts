/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetLibraryDto } from '../models/GetLibraryDto';
import type { Library } from '../models/Library';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LibrariesService {

    /**
     * @param requestBody
     * @returns Library
     * @throws ApiError
     */
    public static librariesControllerFindOwn(
        requestBody: GetLibraryDto,
    ): CancelablePromise<Library> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/libraries',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Library
     * @throws ApiError
     */
    public static librariesControllerFindOneByIdWithPermissions(
        id: string,
        requestBody: GetLibraryDto,
    ): CancelablePromise<Library> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/libraries/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
