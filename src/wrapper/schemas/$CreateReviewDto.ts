/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateReviewDto = {
    properties: {
        igdbId: {
            type: 'number',
            isRequired: true,
        },
        title: {
            type: 'string',
            isRequired: true,
            minLength: 3,
        },
        content: {
            type: 'string',
            isRequired: true,
            minLength: 3,
        },
        rating: {
            type: 'number',
            isRequired: true,
            maximum: 5,
        },
    },
} as const;
