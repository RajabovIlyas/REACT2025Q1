import { useEffect, useState } from 'react';
import { People } from '../../entities/people';
import { peopleQuery } from '../../shared/api/people';

type CardDetailsHookProps = {
    personId?: string | null;
};

export const useCardDetails = ({ personId }: CardDetailsHookProps) => {
    const [person, setPerson] = useState<People | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchPerson = async () => {
        if (!personId) {
            setPerson(null);
            return;
        }
        setLoading(true);
        try {
            const response = await peopleQuery(personId);
            setPerson(response);
        } catch (err) {
            if (err instanceof Error) {
                setError(error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerson();
    }, [personId]);

    return { person, loading, error };
};
