/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateReviewDto } from '../models/CreateReviewDto';
import type { Review } from '../models/Review';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ReviewsService {

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static reviewsControllerCreate(
        requestBody: CreateReviewDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/reviews',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param igdbId
     * @returns Review
     * @throws ApiError
     */
    public static reviewsControllerFindAllByIgdbId(
        igdbId: number,
    ): CancelablePromise<Array<Review>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviews',
            query: {
                'igdbId': igdbId,
            },
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static reviewsControllerFindOneById(
        id: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/reviews/{id}',
            path: {
                'id': id,
            },
        });
    }

}
