export interface IBaseFindDto {
    [key: string]: any;
    search?: string;
    offset?: number;
    limit?: number;
    orderBy?: string;
    orderDirection?: "ASC" | "DESC";
}
