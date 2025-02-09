import { useSearchParams as useUrlSearchParams } from 'react-router';

export const useSearchParams = () => {
    const [searchParams, setSearchParams] = useUrlSearchParams();

    const setParams = <T>(params: T) => {
        setSearchParams((searchParams) => {
            return {
                ...Object.fromEntries(searchParams),
                ...params,
            };
        });
    };

    const deleteParams = (params: string) => {
        searchParams.delete(params);
        setSearchParams(Object.fromEntries(searchParams));
    };

    const getParams = (params: string) => searchParams.get(params);

    return { setParams, getParams, deleteParams };
};
