import { fireEvent, render, screen } from '@testing-library/react';
import PeopleSearch from './people-search.tsx';
import { usePeopleSearch } from './hooks';
import { vi } from 'vitest';
import { Providers } from '../../app/providers';
import { MemoryRouter } from 'react-router';

vi.mock('./hooks');

describe('PeopleSearch', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state', () => {
        vi.mocked(usePeopleSearch).mockReturnValue({
            loading: true,
            results: [],
            pagination: {
                prev: null,
                next: null,
            },
            error: null,
            fetchResults: vi.fn(),
            loadPage: vi.fn(),
            triggerError: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Providers>
                    <PeopleSearch />
                </Providers>
            </MemoryRouter>,
        );

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('renders error state', () => {
        const error = new Error('Something went wrong');
        vi.mocked(usePeopleSearch).mockReturnValue({
            loading: false,
            results: [],
            pagination: {
                prev: null,
                next: null,
            },
            error,
            fetchResults: vi.fn(),
            loadPage: vi.fn(),
            triggerError: vi.fn(),
        });

        expect(() =>
            render(
                <MemoryRouter>
                    <Providers>
                        <PeopleSearch />
                    </Providers>
                </MemoryRouter>,
            ),
        ).toThrow(error);
    });

    it('renders results when available', () => {
        vi.mocked(usePeopleSearch).mockReturnValue({
            loading: false,
            results: [{ id: '1', title: 'Luke Skywalker', description: '' }],
            pagination: {
                prev: null,
                next: null,
            },
            error: null,
            fetchResults: vi.fn(),
            loadPage: vi.fn(),
            triggerError: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Providers>
                    <PeopleSearch />
                </Providers>
            </MemoryRouter>,
        );

        expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    it('calls triggerError when button is clicked', () => {
        const mockTriggerError = vi.fn();
        vi.mocked(usePeopleSearch).mockReturnValue({
            loading: false,
            results: [],
            pagination: {
                prev: null,
                next: null,
            },
            error: null,
            fetchResults: vi.fn(),
            loadPage: vi.fn(),
            triggerError: mockTriggerError,
        });

        render(
            <MemoryRouter>
                <Providers>
                    <PeopleSearch />
                </Providers>
            </MemoryRouter>,
        );

        const errorButton = screen.getByText(/trigger error/i);
        fireEvent.click(errorButton);

        expect(mockTriggerError).toHaveBeenCalled();
    });
});
