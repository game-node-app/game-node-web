/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameAlternativeName = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        comment: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        checksum: {
            type: 'string',
        },
        game: {
            type: 'Game',
            isRequired: true,
        },
    },
} as const;
