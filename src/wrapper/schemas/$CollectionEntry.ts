/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CollectionEntry = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        review: {
            type: 'Review',
            isRequired: true,
        },
        reviewId: {
            type: 'string',
            isRequired: true,
        },
        collection: {
            type: 'Collection',
            isRequired: true,
        },
        game: {
            type: 'Game',
            isRequired: true,
        },
        ownedPlatforms: {
            type: 'array',
            contains: {
                type: 'GamePlatform',
            },
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
