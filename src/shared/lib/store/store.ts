import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    selectedItemsReducers,
    selectedItemsSlice,
} from './slices/selected-items.slice.ts';
import { peopleApi } from '../query-api/people-api.ts';

const rootReducers = combineReducers({
    [selectedItemsSlice.name]: selectedItemsReducers,
    [peopleApi.reducerPath]: peopleApi.reducer,
});

export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(peopleApi.middleware);
    },
});

export type RootState = ReturnType<typeof rootReducers>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];
