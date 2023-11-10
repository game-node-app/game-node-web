import { PaginationResponseDto } from "@/wrapper/server";

export type TPaginationResponse<T> = {
    data: T[];
} & PaginationResponseDto;
