/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { schema_GameSearchRequestDto } from '../models/schema_GameSearchRequestDto';
import type { schema_GameSearchResponseDto } from '../models/schema_GameSearchResponseDto';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SearchService {

    /**
     * Searches using Manticore engine
     * Returns a parsed search response from the Manticore engine
     * @param query Account ID
     * @returns schema_GameSearchResponseDto OK
     * @throws ApiError
     */
    public static postSearch(
        query: schema_GameSearchRequestDto,
    ): CancelablePromise<schema_GameSearchResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/search',
            body: query,
        });
    }

}
