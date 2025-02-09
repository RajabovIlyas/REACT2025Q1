import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import {
    PEOPLE_BY_ID_RESULT_MOCK,
    PEOPLE_LIST_RESULT_MOCK,
} from '../../shared/constants/test.constants.ts';
import CardDetails from './card-details.tsx';
import userEvent from '@testing-library/user-event';

describe('Detailed card component', () => {
    const onCloseMock = vi.fn();

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
                <CardDetails closePersonDetails={onCloseMock} personId={'2'} />
            </MemoryRouter>,
        );
    });

    it('Displays a loading indicator while data is loading', () => {
        const loader = screen.getByTestId('loader');
        expect(loader).toBeInTheDocument();
    });

    it('Correctly displays map details after loading', async () => {
        const foundResult = await Promise.all([
            screen.findByText(PEOPLE_BY_ID_RESULT_MOCK.name),
            screen.findByText(PEOPLE_BY_ID_RESULT_MOCK.mass),
            screen.findByText(PEOPLE_BY_ID_RESULT_MOCK.birth_year),
            screen.findByText(PEOPLE_BY_ID_RESULT_MOCK.skin_color),
            screen.findByText(PEOPLE_BY_ID_RESULT_MOCK.hair_color),
        ]);

        foundResult.forEach((result) => {
            expect(result).toBeInTheDocument();
        });
    });

    it('Hides the component when you click the "Close" button', async () => {
        const closeButton = await screen.findByTestId('card-details-close-btn');

        await userEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalled();
    });
});
