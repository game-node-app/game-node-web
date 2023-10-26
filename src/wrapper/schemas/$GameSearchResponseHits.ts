/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameSearchResponseHits = {
    properties: {
        max_score: {
            type: 'number',
        },
        total: {
            type: 'number',
        },
        total_relation: {
            type: 'string',
        },
        hits: {
            type: 'array',
            contains: {
                type: 'GameSearchResponseHit',
            },
        },
    },
} as const;
