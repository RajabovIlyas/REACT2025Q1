import { useEffect, useState } from 'react';
import { People } from '../../entities/people';
import { peopleQuery } from '../../shared/api/people';
import { useParams } from 'react-router';
import { useNavigate } from '../../shared/hooks/navigate.hook.ts';

export const useCardDetails = () => {
    const { setNavigate } = useNavigate();
    const { personId } = useParams();
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

    const closePersonDetails = () => {
        setNavigate('/');
    };

    return { person, loading, error, closePersonDetails };
};
