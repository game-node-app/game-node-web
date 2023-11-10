/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GameSearchRequestDto } from '../models/GameSearchRequestDto';
import type { GameSearchResponseDto } from '../models/GameSearchResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GameSearchService {

    /**
     * @param requestBody
     * @returns GameSearchResponseDto
     * @throws ApiError
     */
    public static gameSearchControllerSearch(
        requestBody: GameSearchRequestDto,
    ): CancelablePromise<GameSearchResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/game/search',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
