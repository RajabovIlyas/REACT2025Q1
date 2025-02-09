import { render, screen } from '@testing-library/react';
import ErrorBoundary from './error-boundary.tsx';
import { AxiosError } from 'axios';

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

    it('should render Page404 when an Axios error occurs', () => {
        const AxiosErrorMock = () => {
            throw new AxiosError('not found', '404');
        };

        render(
            <ErrorBoundary>
                <AxiosErrorMock />
            </ErrorBoundary>,
        );

        expect(screen.getByTestId('page-404')).toBeInTheDocument();
    });
});
