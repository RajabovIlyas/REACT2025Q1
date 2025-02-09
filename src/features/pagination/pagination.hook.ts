import { useState } from 'react';
import { Pagination } from '../../entities/pagination';

export const usePagination = () => {
    const [prev, setPrev] = useState<string | null>(null);
    const [next, setNext] = useState<string | null>(null);

    const setPagination = ({ prev, next }: Pagination) => {
        setPrev(prev);
        setNext(next);
    };

    return { pagination: { prev, next }, setPagination };
};
