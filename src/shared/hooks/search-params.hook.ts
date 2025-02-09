import {
    URLSearchParamsInit,
    useSearchParams as useUrlSearchParams,
} from 'react-router';
import { useCallback } from 'react';

export const useSearchParams = () => {
    const [searchParams, setSearchParams] = useUrlSearchParams();

    const setParams = useCallback(
        <T>(params: T) => {
            setSearchParams({
                ...Object.fromEntries(searchParams),
                ...params,
            });
        },
        [searchParams],
    );

    const replaceSearchParams = (params: URLSearchParamsInit) => {
        setSearchParams(params);
    };

    const deleteParams = (params: string) => {
        searchParams.delete(params);
        setSearchParams(Object.fromEntries(searchParams));
    };

    const getParams = useCallback(
        (params: string) => searchParams.get(params),
        [searchParams],
    );

    return { setParams, getParams, deleteParams, replaceSearchParams };
};
