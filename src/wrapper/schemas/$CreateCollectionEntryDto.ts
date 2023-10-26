/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $CreateCollectionEntryDto = {
    properties: {
        collectionId: {
            type: 'string',
            isRequired: true,
        },
        gameId: {
            type: 'number',
            isRequired: true,
        },
        platformIds: {
            type: 'array',
            contains: {
                type: 'Enum',
            },
            isRequired: true,
        },
    },
} as const;
