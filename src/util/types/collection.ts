import { ILibrary } from "@/util/types/library";
import { IGameMetadata } from "@/util/types/metadata";

export interface ICollection {
    id: string;

    name: string;
    description: string;
    isPublic: boolean;

    library: ILibrary;

    entries: ICollectionEntry[];
    isFavoritesCollection: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ICollectionEntry {
    /**
     * Not to be confused with the igdbId property from GameMetadata
     */
    id: number;
    /**
     * Redudant, since it's also available in the data property.
     * Still, this allows us to easily find a entry by the igdbId, so it's worth it.
     * Feel free to open a PR in the game-node-server repo if you have a better idea
     * (i know you do).
     */
    igdbId: number;
    data: IGameMetadata;
    collection: ICollection;
    createdAt: Date;
    updatedAt: Date;
}
