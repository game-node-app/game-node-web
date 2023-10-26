/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Review = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
        },
        content: {
            type: 'string',
            isRequired: true,
        },
        rating: {
            type: 'number',
            isRequired: true,
        },
        game: {
            type: 'Game',
            isRequired: true,
        },
        reviewStatistics: {
            type: 'ReviewStatistics',
            isRequired: true,
        },
        collectionEntry: {
            type: 'CollectionEntry',
            isRequired: true,
        },
        profile: {
            type: 'Profile',
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
