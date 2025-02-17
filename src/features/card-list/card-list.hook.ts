import { useParams } from 'react-router';
import { useCallback } from 'react';
import { useNavigate } from '../../shared/hooks/navigate.hook.ts';
import { useAppSelector } from '../../shared/lib/store/hooks/redux-types-hooks.ts';

export const useCardList = () => {
    const { setNavigate } = useNavigate();
    const { personId } = useParams();
    const { selectedItems } = useAppSelector((state) => state.selectedItems);

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
    const closeDetails = () => {
        if (!personId) {
            return;
        }
        setNavigate('/');
    };
    return { clickPeople, closeDetails, selectedItems };
};
