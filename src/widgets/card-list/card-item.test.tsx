import CardItem from './card-item.tsx';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '@reduxjs/toolkit';
import { selectedItemsReducers } from '../../shared/lib/store/slices/selected-items.slice.ts';
import { userEvent } from '@testing-library/user-event';

const store = createStore(selectedItemsReducers);

describe('CardItem Component', () => {
    const mockClickPeople = vi.fn();
    const mockSelectedItems = {};

    test('renders CardItem with title and description', () => {
        const props = {
            id: '1',
            title: 'Test Title',
            description: 'Test Description',
            clickPeople: mockClickPeople,
            selectedItems: mockSelectedItems,
        };

        render(
            <Provider store={store}>
                <CardItem {...props} />
            </Provider>,
        );

        expect(screen.getByTestId('card-title')).toHaveTextContent(
            'Test Title',
        );
        expect(screen.getByTestId('card-description')).toHaveTextContent(
            'Test Description',
        );
    });

    test('calls clickPeople when details button is clicked', async () => {
        const props = {
            id: '1',
            title: 'Test Title',
            description: 'Test Description',
            clickPeople: mockClickPeople,
            selectedItems: mockSelectedItems,
        };

        render(
            <Provider store={store}>
                <CardItem {...props} />
            </Provider>,
        );

        await userEvent.click(screen.getByTestId('card-details-button'));
        expect(mockClickPeople).toHaveBeenCalledWith('1');
    });

    test('checkbox is checked if item is selected', () => {
        const selectedItems = {
            '1': {
                id: '1',
                title: 'Test Title',
                description: 'Test Description',
            },
        };
        const props = {
            id: '1',
            title: 'Test Title',
            description: 'Test Description',
            clickPeople: mockClickPeople,
            selectedItems,
        };

        render(
            <Provider store={store}>
                <CardItem {...props} />
            </Provider>,
        );

        expect(
            screen.getByTestId('card-checkbox').querySelector('input'),
        ).toBeChecked();
    });
});
