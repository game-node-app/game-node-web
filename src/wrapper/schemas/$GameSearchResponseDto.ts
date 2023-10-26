/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameSearchResponseDto = {
    properties: {
        took: {
            type: 'number',
        },
        timed_out: {
            type: 'boolean',
        },
        hits: {
            type: 'GameSearchResponseHits',
        },
        profile: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
