import { UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "@/wrapper/server";

export type ExtendedUseQueryResult<TData, TError = ApiError> = {
    queryKey: any[];
    invalidate: () => void;
} & UseQueryResult<TData, TError extends ApiError ? ApiError : unknown>;
