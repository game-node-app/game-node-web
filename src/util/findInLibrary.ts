import { ILibrary } from "@/util/types/library";
import { ICollectionEntry } from "@/util/types/collection";

// This file holds some helper functions to find entries in a library.

/**
 * Find an entry in a library by its IGDB ID.
 * The backend also has a feature for this, but it's quickier to do it client-side.
 * The data on the client-side is provided via the UserInfoContext.
 * @param library
 * @param igdbId
 */
export function findEntryInLibrary(
    library: ILibrary | undefined,
    igdbId: number,
): ICollectionEntry | undefined {
    if (!library || !library.collections) return undefined;

    return library.collections
        .map((collection) => collection.entries)
        .flat()
        .find((entry) => entry.igdbId === igdbId);
}

export function findEntryInFavorites(
    library: ILibrary | undefined,
    igdbId: number,
) {
    if (!library || !library.collections) return undefined;
    const favoritesCollection = library.collections.find((collection) => {
        return collection.isFavoritesCollection;
    });
    if (!favoritesCollection) return undefined;
    const entry = favoritesCollection.entries.find((entry) => {
        return entry.igdbId === igdbId;
    });
    return entry;
}
