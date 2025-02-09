import { useState } from 'react';
import { useSearchParams } from '../../../shared/hooks/search-params.hook.ts';
import { useFetchSearchResult } from './fetch-search-result.hook.ts';
import { usePeopleDetailsModal } from './people-details-modal.hook.ts';

export const usePeopleSearch = () => {
    const { setParams, getParams } = useSearchParams();
    const [error, setError] = useState<Error | null>(null);
    const { fetchSearchResults, results, loading, pagination } =
        useFetchSearchResult({ setError });
    const { personId, closePeopleDetails, clickPeople } =
        usePeopleDetailsModal();

    const fetchResults = async (searchQuery: string) => {
        closePeopleDetails();
        const page = getParams('page');
        await fetchSearchResults(searchQuery, page);
    };

    const loadPage = (page: string) => {
        setParams({ page });
        closePeopleDetails();
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
        clickPeople,
        personId,
        closePeopleDetails,
    };
};
