/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ReviewStatistics = {
    properties: {
        reviewId: {
            type: 'string',
            isRequired: true,
        },
        review: {
            type: 'Review',
            isRequired: true,
        },
        likes: {
            type: 'array',
            contains: {
                type: 'UserLike',
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
