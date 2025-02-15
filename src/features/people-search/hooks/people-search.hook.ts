import { useState } from 'react';
import { useFetchSearchResult } from './fetch-search-result.hook.ts';
import { useNavigate } from '../../../shared/hooks/navigate.hook.ts';
import { useSearchParams } from '../../../shared/hooks/search-params.hook.ts';

export const usePeopleSearch = () => {
    const { setNavigate } = useNavigate();
    const { getParams } = useSearchParams();
    const [error, setError] = useState<Error | null>(null);
    const { fetchSearchResults, results, loading, pagination } =
        useFetchSearchResult({ setError });

    const fetchResults = async (searchQuery: string) => {
        const page = getParams('page') ?? '1';
        setNavigate(`/`, { page: page });
        await fetchSearchResults(searchQuery, page);
    };

    const loadPage = (page: string) => {
        setNavigate(`/`, { page });
        const lastQuery = localStorage.getItem('lastSearchQuery') ?? '';
        fetchSearchResults(lastQuery, page);
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
