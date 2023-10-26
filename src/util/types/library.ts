import { ICollection } from "@/util/types/collection";

export interface ILibrary {
    /**
     * @description The primary key of the library entity.
     * Also used to share the library with other users.
     */
    id: string;
    userId: string;
    collections: ICollection[];
    createdAt: Date;
    updatedAt: Date;
}
