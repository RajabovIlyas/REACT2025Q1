import { useParams } from 'react-router';
import { useNavigate } from '../../shared/hooks/navigate.hook.ts';
import { useGetPeopleByIdQuery } from '../../shared/lib/query-api/people-api.ts';

export const useCardDetails = () => {
    const { setNavigate } = useNavigate();
    const { personId } = useParams();

    const {
        data: person,
        error,
        isFetching: loading,
    } = useGetPeopleByIdQuery({ id: personId });

    const closePersonDetails = () => {
        setNavigate('/');
    };

    return { person, loading, error, closePersonDetails };
};
