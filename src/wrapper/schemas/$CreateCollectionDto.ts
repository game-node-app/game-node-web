/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateCollectionDto = {
    properties: {
        name: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        isPublic: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
        isFavoritesCollection: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
        },
    },
} as const;
