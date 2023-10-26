/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserLike = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        userId: {
            type: 'string',
            isRequired: true,
        },
        gameStatistics: {
            type: 'GameStatistics',
            isRequired: true,
        },
        reviewStatistics: {
            type: 'ReviewStatistics',
            isRequired: true,
        },
        activityStatistics: {
            type: 'ActivityStatistics',
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
