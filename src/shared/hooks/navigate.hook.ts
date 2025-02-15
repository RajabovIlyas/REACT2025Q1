import {
    useNavigate as useNavigateRouter,
    useSearchParams,
} from 'react-router';
import { useCallback } from 'react';

const PARAMS_TO_KEEP = ['page'];

export const useNavigate = () => {
    const navigate = useNavigateRouter();
    const [searchParams] = useSearchParams();

    const setNavigate = useCallback(
        (path: string, newParams = {}) => {
            const url = new URL(path, window.location.origin);
            PARAMS_TO_KEEP.forEach((param) => {
                const value = searchParams.get(param);
                if (!value) {
                    return;
                }
                url.searchParams.set(param, value);
            });

            Object.entries(newParams).forEach(([key, value]) => {
                if (typeof value !== 'string') {
                    return;
                }
                url.searchParams.set(key, value);
            });

            navigate(`${url.pathname}${url.search}`);
        },
        [searchParams],
    );

    return { setNavigate };
};
