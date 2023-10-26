/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Library = {
    properties: {
        userId: {
            type: 'string',
            description: `Also used to share the library with other users.

            Same as SuperTokens' userId.`,
            isRequired: true,
        },
        collections: {
            type: 'array',
            contains: {
                type: 'Collection',
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
