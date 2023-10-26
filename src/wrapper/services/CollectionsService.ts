/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Collection } from '../models/Collection';
import type { CollectionEntry } from '../models/CollectionEntry';
import type { CreateCollectionDto } from '../models/CreateCollectionDto';
import type { CreateCollectionEntryDto } from '../models/CreateCollectionEntryDto';
import type { UpdateCollectionEntryDto } from '../models/UpdateCollectionEntryDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CollectionsService {

    /**
     * @returns Collection
     * @throws ApiError
     */
    public static collectionsControllerFindFavoritesCollection(): CancelablePromise<Collection> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/collections/favorites',
        });
    }

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
            method: 'GET',
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

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static collectionsEntriesControllerCreate(
        requestBody: CreateCollectionEntryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/collections/entries',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param igdbId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static collectionsEntriesControllerUpdate(
        igdbId: number,
        requestBody: UpdateCollectionEntryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/v1/collections/entries/{igdbId}',
            path: {
                'igdbId': igdbId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Returns a specific collection entry based on IGDB ID
     * @param igdbId
     * @returns CollectionEntry
     * @throws ApiError
     */
    public static collectionsEntriesControllerFindEntryByIgdbIdOrId(
        igdbId: number,
    ): CancelablePromise<CollectionEntry> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/collections/entries/{igdbId}',
            path: {
                'igdbId': igdbId,
            },
            errors: {
                400: `Invalid query`,
            },
        });
    }

}
