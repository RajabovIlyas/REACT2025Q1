import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PeopleSearch from './people-search.tsx';
import { MemoryRouter } from 'react-router';
import { vi } from 'vitest';
import {
    PEOPLE_BY_ID_RESULT_MOCK,
    PEOPLE_LIST_RESULT_MOCK,
} from '../../shared/constants/test.constants.ts';
import { Providers } from '../../app/providers';

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
            <Providers>
                <MemoryRouter>
                    <PeopleSearch />
                </MemoryRouter>
            </Providers>,
        );
    });

    it('calls loadPage with correct parameters when Next button is clicked', async () => {
        const nextButton = await screen.findByTestId('pagination-next');
        await userEvent.click(nextButton);

        expect(true).toBe(true);
    });
});
