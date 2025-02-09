import CardList from './card-list.tsx';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

const CHECK_CARD_LIST = [
    { id: '1', title: 'Test 1', description: 'Test 1' },
    { id: '2', title: 'Test 2', description: 'Test 2' },
    { id: '3', title: 'Test 3', description: 'Test 3' },
];

describe('Card list component', () => {
    it('renders the correct number of cards', () => {
        render(<CardList results={CHECK_CARD_LIST} clickPeople={vi.fn()} />);

        CHECK_CARD_LIST.forEach((card) => {
            const cardItems = screen.getByTestId(`result-card-${card.id}`);
            expect(cardItems).toBeInTheDocument();
        });
    });

    it(' renders the correct message is displayed if no cards are present', () => {
        render(<CardList results={[]} clickPeople={vi.fn()} />);

        const noCardsMessage = screen.getByTestId('no-cards-message');
        expect(noCardsMessage).toBeTruthy();
        expect(noCardsMessage.textContent).toBe('No results found');
    });
});
