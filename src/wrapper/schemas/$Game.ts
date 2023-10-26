/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Game = {
    properties: {
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
        url: {
            type: 'string',
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
        dlcs: {
            type: 'array',
            contains: {
                type: 'Game',
            },
        },
        dlcOf: {
            type: 'Game',
        },
        expansions: {
            type: 'array',
            contains: {
                type: 'Game',
            },
        },
        expansionOf: {
            type: 'Game',
        },
        expandedGames: {
            type: 'array',
            contains: {
                type: 'Game',
            },
        },
        expandedGameOf: {
            type: 'Game',
        },
        similarGames: {
            type: 'array',
            contains: {
                type: 'Game',
            },
        },
        similarGameOf: {
            type: 'Game',
        },
        cover: {
            type: 'GameCover',
        },
        collection: {
            type: 'GameCollection',
        },
        alternativeNames: {
            type: 'array',
            contains: {
                type: 'GameAlternativeName',
            },
        },
        artworks: {
            type: 'array',
            contains: {
                type: 'GameArtwork',
            },
        },
        screenshots: {
            type: 'array',
            contains: {
                type: 'GameScreenshot',
            },
        },
        localizations: {
            type: 'array',
            contains: {
                type: 'GameLocalization',
            },
        },
        gameModes: {
            type: 'array',
            contains: {
                type: 'GameMode',
            },
        },
        genres: {
            type: 'array',
            contains: {
                type: 'GameGenre',
            },
        },
        keywords: {
            type: 'array',
            contains: {
                type: 'GameKeyword',
            },
        },
        franchises: {
            type: 'array',
            contains: {
                type: 'GameFranchise',
            },
        },
        platforms: {
            type: 'array',
            contains: {
                type: 'GamePlatform',
            },
        },
        externalGames: {
            type: 'array',
            contains: {
                type: 'GameExternalGame',
            },
        },
    },
} as const;
