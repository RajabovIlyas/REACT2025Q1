import { useState } from 'react';
import { useFetchSearchResult } from './fetch-search-result.hook.ts';
import { useNavigate } from '../../../shared/hooks/navigate.hook.ts';
import { useSearchParams } from '../../../shared/hooks/search-params.hook.ts';

export const usePeopleSearch = () => {
    const { getParams } = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(
        localStorage.getItem('lastSearchQuery') ?? '',
    );
    const [page, setPage] = useState(getParams('page') ?? '1');
    const { setNavigate } = useNavigate();
    const [error, setError] = useState<Error | null>(null);
    const { results, loading, pagination } = useFetchSearchResult({
        searchQuery,
        page,
        setError,
    });

    const fetchResults = async (searchQuery: string) => {
        const page = getParams('page') ?? '1';
        setNavigate(`/`, { page: page });
        setSearchQuery(searchQuery);
    };

    const loadPage = (page: string) => {
        setNavigate(`/`, { page });
        setPage(page);
    };

    const triggerError = () => {
        try {
            throw new Error('Test error');
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err);
            }
        }
    };

    return {
        loadPage,
        pagination,
        results,
        loading,
        error,
        triggerError,
        fetchResults,
    };
};
