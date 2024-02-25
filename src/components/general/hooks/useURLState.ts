import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ParsedUrlQuery } from "querystring";

interface IURLObj {
    [p: string]: unknown;
}

type UseUrlStateReturn<T extends IURLObj | undefined> = [
    T,
    (values: T) => void,
];

export function useURLState<T extends IURLObj | undefined>(
    defaultValue: T,
): UseUrlStateReturn<T> {
    const router = useRouter();
    const urlQuery = router.query;
    const [internalParams, setInternalParams] = useState<T>(defaultValue);
    const hasLoadedFirstParams = useRef(false);

    const setParams = useCallback(
        (values: T) => {
            const urlParams = new URLSearchParams();
            const valuesWithInternalParams: T = {
                ...internalParams,
                ...values,
            };
            for (const [k, v] of Object.entries(
                valuesWithInternalParams as IURLObj,
            )) {
                if (v == undefined) continue;

                urlParams.set(k, `${v}`);
            }
            router.replace({
                query: urlParams.toString(),
            });
            setInternalParams(valuesWithInternalParams as T);
        },
        [internalParams, router],
    );

    useEffect(() => {
        if (!router.isReady || hasLoadedFirstParams.current) {
            return;
        }

        const urlObj: any = {};
        for (const [urlKey, urlValue] of Object.entries(urlQuery)) {
            if (typeof urlValue !== "string") continue;
            urlObj[urlKey] = urlValue;
        }
        setParams(urlObj);
        hasLoadedFirstParams.current = true;
    }, [internalParams, router.isReady, setParams, urlQuery]);

    return [internalParams, setParams];
}
