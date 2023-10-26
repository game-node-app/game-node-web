export type TPaginationInfo = {
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
};

export type TPaginationResponse<T> = {
    data: T[];
    pagination: TPaginationInfo;
};
