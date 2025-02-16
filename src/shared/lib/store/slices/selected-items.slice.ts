import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { SelectedItems } from '../../../../entities/selected-items';
import { PeopleSearchResult } from '../../../../entities/people';

type InitialState = {
    selectedItems: SelectedItems;
};

const initialState: InitialState = {
    selectedItems: {},
};

type TSelectedItemsReducers = {
    selectedItem(
        state: InitialState,
        action: PayloadAction<PeopleSearchResult>,
    ): void;
    resetSelectedItem(state: InitialState): void;
};

export const selectedItemsSlice: Slice<
    typeof initialState,
    TSelectedItemsReducers,
    'selectedItems'
> = createSlice({
    name: 'selectedItems',
    initialState,
    reducers: {
        selectedItem(
            state: InitialState,
            action: PayloadAction<PeopleSearchResult>,
        ) {
            state.selectedItems = {
                ...state.selectedItems,
                [action.payload.id]: state.selectedItems[action.payload.id]
                    ? null
                    : action.payload,
            };
        },
        resetSelectedItem(state: InitialState) {
            state.selectedItems = {};
        },
    },
});

export const selectedItemsActions = selectedItemsSlice.actions;
export const selectedItemsReducers = selectedItemsSlice.reducer;
