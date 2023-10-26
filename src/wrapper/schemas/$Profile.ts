/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Profile = {
    properties: {
        userId: {
            type: 'string',
            description: `Shareable string ID

            Same as SuperTokens' userId.`,
            isRequired: true,
        },
        username: {
            type: 'string',
            isRequired: true,
        },
        avatar: {
            type: 'ProfileAvatar',
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
