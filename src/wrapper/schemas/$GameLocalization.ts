/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameLocalization = {
    properties: {
        game: {
            type: 'Game',
            isRequired: true,
        },
        id: {
            type: 'number',
            isRequired: true,
        },
        checksum: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
        },
        slug: {
            type: 'string',
        },
        url: {
            type: 'string',
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
    },
} as const;
