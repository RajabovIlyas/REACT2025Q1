import { ChangeEvent, useEffect } from 'react';
import { useLocalStorage } from '../../shared/hooks/local-storage.hook.ts';

type SearchbarHookProps = {
    onSearch: (query: string) => Promise<void>;
};

export const useSearchBar = ({ onSearch }: SearchbarHookProps) => {
    const [query, setQuery] = useLocalStorage('lastSearchQuery');

    const handleSearch = () => {
        const trimmedQuery = query.trim();
        onSearch(trimmedQuery);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return { handleInputChange, handleSearch, query };
};
