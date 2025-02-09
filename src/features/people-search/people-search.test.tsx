import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PeopleSearch from './people-search.tsx';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import { peopleListQuery, peopleQuery } from '../../shared/api/people';
import {
    PEOPLE_BY_ID_RESULT_MOCK,
    PEOPLE_LIST_RESULT_MOCK,
} from '../../shared/constants/test.constants.ts';

describe('people-search component', () => {
    beforeEach(() => {
        vi.mock('../../shared/api/people', () => {
            return {
                peopleListQuery: vi.fn(() =>
                    Promise.resolve(PEOPLE_LIST_RESULT_MOCK),
                ),
                peopleQuery: vi.fn(() =>
                    Promise.resolve(PEOPLE_BY_ID_RESULT_MOCK),
                ),
            };
        });

        render(
            <MemoryRouter>
                <PeopleSearch />
            </MemoryRouter>,
        );
    });

    it('Opens the detailed card component when clicking on the card', async () => {
        expect(peopleListQuery).toHaveBeenCalledWith('', null);
        const resultCard1 = await screen.findByTestId('result-card-2');

        await userEvent.click(resultCard1);

        const cardDetails = screen.getByTestId('card-details');
        expect(cardDetails).toBeInTheDocument();
    });

    it('Calls an API to get detailed information when a card is clicked', async () => {
        expect(peopleListQuery).toHaveBeenCalledWith('', null);
        const resultCard1 = await screen.findByTestId('result-card-2');

        await userEvent.click(resultCard1);

        expect(peopleQuery).toHaveBeenCalledWith('2');

        const cardDetailsResult = await screen.findByTestId(
            'card-details-result',
        );
        expect(cardDetailsResult).toBeInTheDocument();

        const result = await screen.findByText(PEOPLE_BY_ID_RESULT_MOCK.mass);

        expect(result).toBeInTheDocument();
        expect(
            screen.getByText(PEOPLE_BY_ID_RESULT_MOCK.birth_year),
        ).toBeInTheDocument();
        expect(
            screen.getByText(PEOPLE_BY_ID_RESULT_MOCK.hair_color),
        ).toBeInTheDocument();
        expect(
            screen.getByText(PEOPLE_BY_ID_RESULT_MOCK.skin_color),
        ).toBeInTheDocument();
    });

    it('calls loadPage with correct parameters when Next button is clicked', async () => {
        const nextButton = await screen.findByTestId('pagination-next');
        await userEvent.click(nextButton);

        expect(peopleListQuery).toHaveBeenCalledWith('', '2');
    });
});
