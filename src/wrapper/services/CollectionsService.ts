/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Collection } from '../models/Collection';
import type { CreateCollectionDto } from '../models/CreateCollectionDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CollectionsService {

    /**
     * Returns a collection which the user has access to
     *
     * (Either its own collection or a public one)
     * @param id
     * @returns Collection
     * @throws ApiError
     */
    public static collectionsControllerFindOneByIdWithPermissions(
        id: string,
    ): CancelablePromise<Collection> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/collections/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static collectionsControllerCreate(
        requestBody: CreateCollectionDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/collections',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
