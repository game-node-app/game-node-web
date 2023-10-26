import {
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult,
    useQuery,
    UseQueryResult,
} from "react-query";
import { useContext } from "react";
import { UseQueryOptions } from "react-query/types/react/types";
import buildAxiosInstance from "@/util/buildAxiosInstance";
import { IBaseFindDto } from "@/util/types/baseDto";

interface IUseInfiniteQueryWithParametersProps {
    url: string;
    parameters?: IBaseFindDto;
    method: string;
    options?:
        | UseInfiniteQueryOptions<any, any, any, string | readonly unknown[]>
        | undefined;
}

/**
 * The result of the useQueryWithParameters hook.
 * Also returns queryKey to easily invalidate cache when needed.
 */
type TUseInfiniteQueryWithParametersResult<T> = UseInfiniteQueryResult<T> & {
    queryKey: (string | object | undefined)[];
};

/**
 * General purpose hook to retrieve data from endpoints that accept query parameters.
 * This version uses the react-query useInfiniteQuery hook.
 * Errors are returned in the error property, as AxiosError.
 *
 *
 * @param url
 * @param parameters
 * @param method
 * @param T - Optional type parameter that defines the type of the data returned by the endpoint.
 */
export default function useInfiniteQueryWithParameters<T>({
    url,
    parameters,
    method,
    options,
}: IUseInfiniteQueryWithParametersProps): TUseInfiniteQueryWithParametersResult<T> {
    const queryKey = [url, method, parameters];
    return {
        ...useInfiniteQuery({
            queryKey: queryKey,
            queryFn: async (ctx) => {
                const axiosClient = buildAxiosInstance();
                const response = await axiosClient.request<T>({
                    url: ctx.queryKey[0] as string,
                    method: ctx.queryKey[1] as string,
                    params: ctx.queryKey[2],
                });
                return response.data;
            },
            ...options,
        }),
        queryKey: queryKey,
    };
}
