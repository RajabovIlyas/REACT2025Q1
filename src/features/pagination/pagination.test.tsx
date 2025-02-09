import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from './pagination.tsx';
import { vi } from 'vitest';

describe('Pagination сomponent', () => {
    const mockLoadPage = vi.fn();

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders both buttons', () => {
        render(
            <Pagination
                prev="prevPage"
                next="nextPage"
                loadPage={mockLoadPage}
                loading={false}
            />,
        );

        expect(screen.getByText('Previous')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('disables Previous button when prev is null', () => {
        render(
            <Pagination
                prev={null}
                next="nextPage"
                loadPage={mockLoadPage}
                loading={false}
            />,
        );

        const prevButton = screen.getByText('Previous');
        expect(prevButton).toBeDisabled();
    });

    it('disables Next button when next is null', () => {
        render(
            <Pagination
                prev="prevPage"
                next={null}
                loadPage={mockLoadPage}
                loading={false}
            />,
        );

        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeDisabled();
    });

    it('calls loadPage with prev when Previous button is clicked', () => {
        render(
            <Pagination
                prev="prevPage"
                next="nextPage"
                loadPage={mockLoadPage}
                loading={false}
            />,
        );

        const prevButton = screen.getByText('Previous');
        fireEvent.click(prevButton);

        expect(mockLoadPage).toHaveBeenCalledWith('prevPage');
    });

    it('calls loadPage with next when Next button is clicked', () => {
        render(
            <Pagination
                prev="prevPage"
                next="nextPage"
                loadPage={mockLoadPage}
                loading={false}
            />,
        );

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        expect(mockLoadPage).toHaveBeenCalledWith('nextPage');
    });

    it('does not call loadPage when Previous button is clicked and prev is null', () => {
        render(
            <Pagination
                prev={null}
                next="nextPage"
                loadPage={mockLoadPage}
                loading={false}
            />,
        );

        const prevButton = screen.getByText('Previous');
        fireEvent.click(prevButton);

        expect(mockLoadPage).not.toHaveBeenCalled();
    });

    it('does not call loadPage when Next button is clicked and next is null', () => {
        render(
            <Pagination
                prev="prevPage"
                next={null}
                loadPage={mockLoadPage}
                loading={false}
            />,
        );

        const nextButton = screen.getByText('Next');
        fireEvent.click(nextButton);

        expect(mockLoadPage).not.toHaveBeenCalled();
    });

    it('disables both buttons when loading is true', () => {
        render(
            <Pagination
                prev="prevPage"
                next="nextPage"
                loadPage={mockLoadPage}
                loading={true}
            />,
        );

        const prevButton = screen.getByText('Previous');
        const nextButton = screen.getByText('Next');

        expect(prevButton).toBeDisabled();
        expect(nextButton).toBeDisabled();
    });
});
