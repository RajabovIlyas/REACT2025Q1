import { render, screen } from '@testing-library/react';
import ErrorBoundary from './error-boundary.tsx';

describe('ErrorBoundary', () => {
    it('should render children when there is no error', () => {
        render(
            <ErrorBoundary>
                <div data-testid="child">Child Component</div>
            </ErrorBoundary>,
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should render error message when an error occurs', () => {
        const ThrowError = () => {
            throw new Error('Test error');
        };

        render(
            <ErrorBoundary>
                <ThrowError />
            </ErrorBoundary>,
        );

        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
});
