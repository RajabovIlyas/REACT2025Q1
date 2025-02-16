import {
    useAppDispatch,
    useAppSelector,
} from '../../shared/lib/store/hooks/redux-types-hooks.ts';
import { useMemo } from 'react';
import { PeopleSearchResult } from '../../entities/people';
import { selectedItemsActions } from '../../shared/lib/store/slices/selected-items.slice.ts';
import { downloadCSV } from '../../shared/lib/download-csv/download-csv.ts';

export const useSelectedDropdown = () => {
    const { selectedItems } = useAppSelector((state) => state.selectedItems);
    const dispatch = useAppDispatch();

    const filteredSelectedItems = useMemo(() => {
        return Object.keys(selectedItems).reduce((acc, key) => {
            if (!selectedItems[key]) {
                return acc;
            }
            return [...acc, selectedItems[key]];
        }, [] as PeopleSearchResult[]);
    }, [selectedItems]);

    const onResetSelected = () => {
        dispatch(selectedItemsActions.resetSelectedItem());
    };

    const onDownload = () => {
        downloadCSV(filteredSelectedItems);
    };

    return { onDownload, onResetSelected, filteredSelectedItems };
};
