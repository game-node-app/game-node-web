/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameExternalGame = {
    properties: {
        id: {
            type: 'number',
            isRequired: true,
        },
        uid: {
            type: 'string',
            description: `Corresponds to the game id on the target source (see GameExternalGameCategory).
            It's called uid, not uuid.`,
            isRequired: true,
        },
        category: {
            type: 'Enum',
        },
        media: {
            type: 'Enum',
        },
        checksum: {
            type: 'string',
        },
        name: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
        year: {
            type: 'number',
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
        games: {
            type: 'array',
            contains: {
                type: 'Game',
            },
            isRequired: true,
        },
    },
} as const;
