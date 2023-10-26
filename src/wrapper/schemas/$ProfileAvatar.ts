/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ProfileAvatar = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        mimetype: {
            type: 'string',
            isRequired: true,
        },
        extension: {
            type: 'string',
            isRequired: true,
        },
        size: {
            type: 'number',
            isRequired: true,
        },
        filename: {
            type: 'string',
            isRequired: true,
        },
        encoding: {
            type: 'string',
            isRequired: true,
        },
        path: {
            type: 'string',
            description: `Multer's File's destination + filename`,
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
