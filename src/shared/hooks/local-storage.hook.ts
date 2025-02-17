import { useEffect, useState } from 'react';

export const useLocalStorage = (
    key: string,
): [string, (str: string) => void] => {
    const [query, setQueryState] = useState('');

    useEffect(() => {
        const savedQuery = localStorage.getItem(key) ?? '';
        setQueryState(savedQuery);
    }, [key]);

    const setQuery = (value: string) => {
        setQueryState(value);
        localStorage.setItem(key, value);
    };

    return [query, setQuery];
};
