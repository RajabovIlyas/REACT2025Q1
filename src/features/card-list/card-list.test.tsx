import { render, screen } from '@testing-library/react';
import CardList from './card-list.tsx';
import { useCardList } from './card-list.hook.ts';
import { vi } from 'vitest';
import { Providers } from '../../app/providers';

vi.mock('./card-list.hook.ts');

describe('CardList', () => {
    const mockClickPeople = vi.fn();
    const mockCloseDetails = vi.fn();
    const mockSelectedItems = {};

    beforeEach(() => {
        vi.mocked(useCardList).mockReturnValue({
            clickPeople: mockClickPeople,
            closeDetails: mockCloseDetails,
            selectedItems: mockSelectedItems,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders CardListWidgets with correct props', () => {
        const results = [
            { id: '1', title: 'John Doe', description: '' },
            { id: '2', title: 'Jane Smith', description: '' },
        ];

        render(
            <Providers>
                <CardList results={results} />
            </Providers>,
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(useCardList).toHaveBeenCalled();
    });

    it('calls clickPeople when a person is clicked', async () => {
        const results = [{ id: '1', title: 'John Doe', description: '' }];

        render(
            <Providers>
                <CardList results={results} />
            </Providers>,
        );

        const personButton = await screen.findByTestId('card-details-button');
        personButton.click();

        expect(mockClickPeople).toHaveBeenCalledWith('1');
    });
});
