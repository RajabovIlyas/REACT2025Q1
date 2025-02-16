import { vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { PEOPLE_BY_ID_RESULT_MOCK } from '../../shared/constants/test.constants.ts';
import CardDetails from './card-details.tsx';
import { useCardDetails } from './card-details.hook.ts';

vi.mock('./card-details.hook.ts', () => ({
    useCardDetails: vi.fn(),
}));

describe('Detailed card component', () => {
    const onCloseMock = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should render null if personId is not provided', () => {
        vi.mocked(useCardDetails).mockReturnValue({
            loading: false,
            person: null,
            error: null,
        });
        render(
            <CardDetails personId={null} closePersonDetails={onCloseMock} />,
        );

        expect(screen.queryByTestId('card-details')).toBeNull();
    });

    it('should render Loader when loading is true', () => {
        vi.mocked(useCardDetails).mockReturnValue({
            loading: true,
            person: null,
            error: null,
        });

        render(<CardDetails personId="1" closePersonDetails={onCloseMock} />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should render CardDetailsUI when person is available', () => {
        vi.mocked(useCardDetails).mockReturnValue({
            loading: false,
            person: PEOPLE_BY_ID_RESULT_MOCK,
            error: null,
        });

        render(<CardDetails personId="1" closePersonDetails={onCloseMock} />);
        expect(screen.getByTestId('card-details')).toBeInTheDocument();
        expect(screen.getByText('C-3PO')).toBeInTheDocument();
    });

    it('should call closePersonDetails when close button is clicked', () => {
        vi.mocked(useCardDetails).mockReturnValue({
            loading: false,
            person: PEOPLE_BY_ID_RESULT_MOCK,
            error: null,
        });

        render(<CardDetails personId="1" closePersonDetails={onCloseMock} />);
        fireEvent.click(screen.getByTestId('card-details-close-btn'));
        expect(onCloseMock).toHaveBeenCalled();
    });

    it('should throw error if error is present', () => {
        vi.mocked(useCardDetails).mockReturnValue({
            loading: false,
            person: null,
            error: new Error('Some error'),
        });

        expect(() => {
            render(
                <CardDetails personId="1" closePersonDetails={onCloseMock} />,
            );
        }).toThrow('Some error');
    });
});
