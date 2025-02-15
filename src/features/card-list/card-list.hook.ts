import { useParams } from 'react-router';
import { useCallback } from 'react';
import { useNavigate } from '../../shared/hooks/navigate.hook.ts';

export const useCardList = () => {
    const { setNavigate } = useNavigate();
    const { personId } = useParams();

    const clickPeople = useCallback(
        (id: string) => {
            if (personId) {
                setNavigate('/');
                return;
            }
            setNavigate(`/details/${id}`);
        },
        [personId],
    );
    return { clickPeople };
};
