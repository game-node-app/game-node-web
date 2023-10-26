/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Collection = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        description: {
            type: 'string',
            isRequired: true,
        },
        isPublic: {
            type: 'boolean',
            isRequired: true,
        },
        library: {
            type: 'Library',
            isRequired: true,
        },
        entries: {
            type: 'array',
            contains: {
                type: 'CollectionEntry',
            },
            isRequired: true,
        },
        isFavoritesCollection: {
            type: 'boolean',
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
    },
} as const;
