/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ActivityStatistics = {
    properties: {
        activityId: {
            type: 'string',
            isRequired: true,
        },
        views: {
            type: 'array',
            contains: {
                type: 'UserView',
            },
            isRequired: true,
        },
        likes: {
            type: 'array',
            contains: {
                type: 'UserLike',
            },
            isRequired: true,
        },
        activity: {
            type: 'Activity',
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
