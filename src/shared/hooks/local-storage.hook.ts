import { useMemo, useState } from 'react';

export const useLocalStorage = (
    key: string,
): [string, (str: string) => void] => {
    const [query, setQuery] = useState('');

    useMemo(() => {
        const savedQuery = localStorage.getItem(key);
        if (savedQuery) {
            setQuery(savedQuery);
        }
    }, [key]);

    useMemo(() => {
        if (query) {
            localStorage.setItem(key, query);
        }
    }, [key, query]);

    return [query, setQuery];
};
