/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GamePlatform = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        abbreviation: {
            type: 'string',
            isRequired: true,
        },
        alternative_name: {
            type: 'string',
            isRequired: true,
        },
        category: {
            type: 'Enum',
            isRequired: true,
        },
        checksum: {
            type: 'string',
            isRequired: true,
        },
        generation: {
            type: 'number',
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        createdAt: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        updatedAt: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
        },
        games: {
            type: 'array',
            contains: {
                type: 'Game',
            },
            isRequired: true,
        },
    },
} as const;
