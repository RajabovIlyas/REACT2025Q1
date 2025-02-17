import { render, screen } from '@testing-library/react';
import CardDetails from './card-details.tsx';
import { PEOPLE_BY_ID_RESULT_MOCK } from '../../shared/constants/test.constants.ts';

describe('CardDetails', () => {
    it('renders correctly with given props', () => {
        render(<CardDetails {...PEOPLE_BY_ID_RESULT_MOCK} />);

        expect(screen.getByTestId('card-details-name')).toHaveTextContent(
            'name: C-3PO',
        );
        expect(screen.getByTestId('card-details-birth-year')).toHaveTextContent(
            'birth year: 112BBY',
        );
        expect(screen.getByTestId('card-details-massa')).toHaveTextContent(
            'massa: 75',
        );
        expect(screen.getByTestId('card-details-hair-color')).toHaveTextContent(
            'hair color: n/a',
        );
        expect(screen.getByTestId('card-details-skin-color')).toHaveTextContent(
            'skin color: gold',
        );
    });
});
