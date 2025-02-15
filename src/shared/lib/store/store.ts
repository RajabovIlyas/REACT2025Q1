import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    selectedItemsReducers,
    selectedItemsSlice,
} from './slices/selected-items.slice.ts';

const rootReducers = combineReducers({
    [selectedItemsSlice.name]: selectedItemsReducers,
});

export const store = configureStore({
    reducer: rootReducers,
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
