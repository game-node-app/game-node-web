/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameSearchRequestDto = {
    properties: {
        index: {
            type: 'Enum',
            isRequired: true,
        },
        query: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isRequired: true,
        },
        fulltextFilter: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        attrFilter: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        limit: {
            type: 'number',
        },
        offset: {
            type: 'number',
        },
        maxMatches: {
            type: 'number',
        },
        sort: {
            type: 'array',
            contains: {
                type: 'dictionary',
                contains: {
                    properties: {
                    },
                },
            },
        },
        aggs: {
            type: 'array',
            contains: {
                type: 'dictionary',
                contains: {
                    properties: {
                    },
                },
            },
        },
        expressions: {
            type: 'array',
            contains: {
                type: 'dictionary',
                contains: {
                    properties: {
                    },
                },
            },
        },
        highlight: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        profile: {
            type: 'boolean',
        },
        trackScores: {
            type: 'boolean',
        },
    },
} as const;
