/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Game } from '../models/Game';
import type { GameRepositoryRequestDto } from '../models/GameRepositoryRequestDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * @param id
     * @param requestBody
     * @returns Game
     * @throws ApiError
     */
    public static gameRepositoryControllerFindOneById(
        id: number,
        requestBody: GameRepositoryRequestDto,
    ): CancelablePromise<Game> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/game/repository/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
