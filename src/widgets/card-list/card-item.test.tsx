import CardItem from './card-item.tsx';
import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';

const CARD_DATA = {
    id: '1',
    title: 'Test Card',
    description: 'This is search result',
};

describe('Card Item component', () => {
    beforeEach(() => {
        render(<CardItem {...CARD_DATA} clickPeople={vi.fn()} />);
    });

    it('renders the relevant card data', () => {
        const cardTitle = screen.getByTestId('card-title');
        const cardDescription = screen.getByTestId('card-description');
        expect(cardTitle.textContent).toBe(CARD_DATA.title);
        expect(cardDescription.textContent).toBe(CARD_DATA.description);
    });
});
