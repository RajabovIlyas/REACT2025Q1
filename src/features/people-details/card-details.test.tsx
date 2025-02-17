import { fireEvent, render, screen } from '@testing-library/react';
import CardDetails from './card-details.tsx';
import { useCardDetails } from './card-details.hook.ts';
import { vi } from 'vitest';
import { PEOPLE_BY_ID_RESULT_MOCK } from '../../shared/constants/test.constants.ts';

vi.mock('./card-details.hook.ts');

describe('CardDetails', () => {
    const mockClosePersonDetails = vi.fn();

    beforeEach(() => {
        vi.mocked(useCardDetails).mockReturnValue({
            error: undefined,
            person: undefined,
            loading: false,
            closePersonDetails: mockClosePersonDetails,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders loading state', () => {
        vi.mocked(useCardDetails).mockReturnValue({
            error: undefined,
            person: undefined,
            loading: true,
            closePersonDetails: mockClosePersonDetails,
        });

        render(<CardDetails />);

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('renders error state', () => {
        const error = new Error('Something went wrong');
        vi.mocked(useCardDetails).mockReturnValue({
            error,
            person: undefined,
            loading: false,
            closePersonDetails: mockClosePersonDetails,
        });

        expect(() => render(<CardDetails />)).toThrow(error);
    });

    it('renders person details', () => {
        vi.mocked(useCardDetails).mockReturnValue({
            error: undefined,
            person: PEOPLE_BY_ID_RESULT_MOCK,
            loading: false,
            closePersonDetails: mockClosePersonDetails,
        });

        render(<CardDetails />);

        expect(screen.getByTestId('card-details')).toBeInTheDocument();
        expect(screen.getByText('C-3PO')).toBeInTheDocument();
        expect(screen.getByText('112BBY')).toBeInTheDocument();
    });

    it('calls closePersonDetails when close button is clicked', () => {
        vi.mocked(useCardDetails).mockReturnValue({
            error: undefined,
            person: PEOPLE_BY_ID_RESULT_MOCK,
            loading: false,
            closePersonDetails: mockClosePersonDetails,
        });

        render(<CardDetails />);

        const closeButton = screen.getByTestId('card-details-close-btn');
        fireEvent.click(closeButton);

        expect(mockClosePersonDetails).toHaveBeenCalled();
    });
});
