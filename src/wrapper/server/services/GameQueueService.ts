/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateGameDto } from '../models/CreateGameDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GameQueueService {

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static gameQueueControllerSync(
        requestBody: CreateGameDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/game/queue',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
