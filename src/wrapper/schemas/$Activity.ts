/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Activity = {
    properties: {
        id: {
            type: 'string',
            isRequired: true,
        },
        type: {
            type: 'Enum',
            isRequired: true,
        },
        sourceId: {
            type: 'string',
            isRequired: true,
        },
        profile: {
            type: 'all-of',
            description: `The associated profile with this Activity`,
            contains: [{
                type: 'Profile',
            }],
            isRequired: true,
        },
        statistics: {
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
