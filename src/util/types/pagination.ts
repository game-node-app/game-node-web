import { PaginationResponseDto } from "@/wrapper";

export type TPaginationResponse<T> = {
    data: T[];
} & PaginationResponseDto;
