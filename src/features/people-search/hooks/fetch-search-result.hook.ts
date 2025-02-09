import { peopleListQuery } from '../../../shared/api/people';
import { transformPeoplesResToPagination } from '../../../entities/pagination';
import {
    PeopleSearchResult,
    transformPeoplesResToPeoplesResult,
} from '../../../entities/people';
import { useState } from 'react';
import { usePagination } from '../../pagination';

type RequestResultHookProps = {
    setError: (err: Error | null) => void;
};

export const useFetchSearchResult = ({ setError }: RequestResultHookProps) => {
    const [results, setResults] = useState<PeopleSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const { pagination, setPagination } = usePagination();

    const fetchSearchResults = async (
        searchQuery: string,
        page?: string | null,
    ) => {
        setLoading(true);
        setError(null);
        try {
            const response = await peopleListQuery(searchQuery, page);
            setPagination(transformPeoplesResToPagination(response));
            setResults(transformPeoplesResToPeoplesResult(response));
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err);
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { fetchSearchResults, pagination, results, loading };
};
