/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $GameSearchResponseHit = {
    properties: {
        coverUrl: {
            type: 'string',
        },
        numViews: {
            type: 'number',
        },
        numLikes: {
            type: 'number',
        },
        genresNames: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        platformsNames: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        platformsAbbreviations: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isRequired: true,
        },
        source: {
            type: 'Enum',
            isRequired: true,
        },
        id: {
            type: 'number',
            description: `Should be mapped to the IGDB ID of the game.`,
            isRequired: true,
        },
        name: {
            type: 'string',
            isRequired: true,
        },
        slug: {
            type: 'string',
            isRequired: true,
        },
        summary: {
            type: 'string',
            isRequired: true,
        },
        storyline: {
            type: 'string',
            isRequired: true,
        },
        checksum: {
            type: 'string',
            isRequired: true,
        },
        aggregatedRating: {
            type: 'number',
        },
        aggregatedRatingCount: {
            type: 'number',
        },
        category: {
            type: 'Enum',
            isRequired: true,
        },
        status: {
            type: 'Enum',
            isRequired: true,
        },
        firstReleaseDate: {
            type: 'string',
            isRequired: true,
            format: 'date-time',
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
