import { useQuery, UseQueryResult } from "react-query";
import { useContext } from "react";
import { UseQueryOptions } from "react-query/types/react/types";
import getAxiosInstance from "@/util/getAxiosInstance";

interface IUseQueryWithParameters {
    url: string;
    parameters?: object;
    method: string;
    options?: UseQueryOptions<any, any, any, any> | undefined;
}

/**
 * The result of the useQueryWithParameters hook.
 * Also returns queryKey to easily invalidate cache when needed.
 */
type TUseQueryWithParametersResult<T> = UseQueryResult<T> & {
    queryKey: (string | object | undefined)[];
};

/**
 * General purpose hook to retrieve data from endpoints that accept query parameters.
 *
 * Errors are returned in the error property, as AxiosError.
 *
 *
 * @param url
 * @param parameters
 * @param method
 * @param T - Optional type parameter that defines the type of the data returned by the endpoint.
 */
export default function useQueryWithParameters<T>({
    url,
    parameters,
    method,
    options,
}: IUseQueryWithParameters): TUseQueryWithParametersResult<T> {
    const queryKey = [url, method, parameters];
    return {
        ...useQuery(
            queryKey,
            async (ctx) => {
                const axiosClient = getAxiosInstance();
                const response = await axiosClient.request<T>({
                    url: ctx.queryKey[0] as string,
                    method: ctx.queryKey[1] as string,
                    params: ctx.queryKey[2],
                });
                return response.data;
            },
            {
                ...options,
            },
        ),
        queryKey: queryKey,
    };
}
