/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CollectionEntry } from '../models/CollectionEntry';
import type { CreateCollectionEntryDto } from '../models/CreateCollectionEntryDto';
import type { FavoriteStatusCollectionEntryDto } from '../models/FavoriteStatusCollectionEntryDto';
import type { GetCollectionEntriesDto } from '../models/GetCollectionEntriesDto';
import type { PaginationResponseDto } from '../models/PaginationResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CollectionsEntriesService {

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
            url: '/v1/collections-entries',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Returns a specific collection entry based on game ID
     * @param id
     * @param requestBody
     * @returns CollectionEntry
     * @throws ApiError
     */
    public static collectionsEntriesControllerFindOwnEntryByGameId(
        id: number,
        requestBody: GetCollectionEntriesDto,
    ): CancelablePromise<Array<CollectionEntry>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/collections-entries/game/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid query`,
            },
        });
    }

    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static collectionsEntriesControllerDeleteOwnEntryByGameId(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/collections-entries/game/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static collectionsEntriesControllerChangeFavoriteStatus(
        id: number,
        requestBody: FavoriteStatusCollectionEntryDto,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/collections-entries/game/{id}/favorite',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static collectionsEntriesControllerFindAllByCollectionId(
        id: string,
        requestBody: GetCollectionEntriesDto,
    ): CancelablePromise<PaginationResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/collections-entries/collection/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
