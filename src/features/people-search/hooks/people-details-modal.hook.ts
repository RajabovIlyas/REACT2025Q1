import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from '../../../shared/hooks/search-params.hook.ts';

export const usePeopleDetailsModal = () => {
    const { getParams, setParams, deleteParams } = useSearchParams();
    const [personId, setPersonId] = useState<string | null>(null);

    const clickPeople = useCallback(
        (id: string) => {
            if (personId) {
                deleteParams('details');
                setPersonId(null);
                return;
            }
            setParams({ details: id });
            setPersonId(id);
        },
        [personId],
    );

    const checkDetails = () => {
        const details = getParams('details');
        if (!details) {
            return;
        }
        setPersonId(details);
    };

    const closePeopleDetails = () => {
        deleteParams('details');
        setPersonId(null);
    };

    useEffect(() => {
        checkDetails();
    }, []);

    return { clickPeople, personId, closePeopleDetails };
};
