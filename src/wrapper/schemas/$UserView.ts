/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UserView = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        userId: {
            type: 'string',
        },
        gameStatistics: {
            type: 'GameStatistics',
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
