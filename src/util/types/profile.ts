export interface IProfile {
    // Same as SuperTokens' userId
    id: string;
    username: string;
    userId: string;
    avatar: IProfileAvatar;
    createdAt: Date;
    updatedAt: Date;
}

export interface IProfileAvatar {
    id: number;
    mimetype: string;
    extension: string;
    size: number;
    filename: string;
    encoding: string;
    /**
     * Multer's File's destination + filename
     * Use this + extension against the /public/uploads endpoint in images.
     */
    path: string;
    profile: IProfile;
    createdAt: Date;
    updatedAt: Date;
}
