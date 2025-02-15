import CardItem from './card-item.tsx';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../shared/lib/store/store.ts';

const CARD_DATA = {
    id: '1',
    title: 'Test Card',
    description: 'This is search result',
};

describe('Card Item component', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <CardItem
                    {...CARD_DATA}
                    clickPeople={vi.fn()}
                    selectedItems={{}}
                />
            </Provider>,
        );
    });

    it('renders the relevant card data', () => {
        const cardTitle = screen.getByTestId('card-title');
        const cardDescription = screen.getByTestId('card-description');
        expect(cardTitle.textContent).toBe(CARD_DATA.title);
        expect(cardDescription.textContent).toBe(CARD_DATA.description);
    });
});
