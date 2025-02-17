import { transformPeoplesResToPagination } from '../../../entities/pagination';
import { useMemo } from 'react';
import { usePagination } from '../../pagination';
import { useGetPeopleQuery } from '../../../shared/lib/query-api/people-api.ts';
import { transformPeoplesResToPeoplesResult } from '../../../entities/people';

type RequestResultHookProps = {
    setError: (err: Error | null) => void;
    searchQuery: string;
    page?: string | null;
};

export const useFetchSearchResult = ({
    searchQuery,
    page,
    setError,
}: RequestResultHookProps) => {
    const { pagination, setPagination } = usePagination();
    const {
        data,
        error,
        isFetching: loading,
    } = useGetPeopleQuery({ search: searchQuery, page });

    if (error instanceof Error) {
        setError(error);
    }

    const results = useMemo(() => {
        if (!data) {
            return [];
        }
        setPagination(transformPeoplesResToPagination(data));
        return transformPeoplesResToPeoplesResult(data);
    }, [data]);

    return { pagination, results, loading };
};
