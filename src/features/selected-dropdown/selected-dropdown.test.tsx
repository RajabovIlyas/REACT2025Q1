import { fireEvent, render, screen } from '@testing-library/react';
import SelectedDropdown from './selected-dropdown.tsx';
import { useSelectedDropdown } from './selected-dropdown.hook.ts';
import { vi } from 'vitest';

vi.mock('./selected-dropdown.hook.ts');

describe('SelectedDropdown', () => {
    const mockOnResetSelected = vi.fn();
    const mockOnDownload = vi.fn();

    beforeEach(() => {
        vi.mocked(useSelectedDropdown).mockReturnValue({
            filteredSelectedItems: [],
            onResetSelected: mockOnResetSelected,
            onDownload: mockOnDownload,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders nothing when there are no selected items', () => {
        render(<SelectedDropdown />);

        expect(
            screen.queryByText(/items are selected/i),
        ).not.toBeInTheDocument();
    });

    it('renders selected items message and buttons when there are selected items', () => {
        vi.mocked(useSelectedDropdown).mockReturnValue({
            filteredSelectedItems: [{ id: '1', description: '', title: '' }],
            onResetSelected: mockOnResetSelected,
            onDownload: mockOnDownload,
        });

        render(<SelectedDropdown />);

        expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();

        expect(screen.getByText(/unselect all/i)).toBeInTheDocument();
        expect(screen.getByText(/download/i)).toBeInTheDocument();
    });

    it('calls onResetSelected when "Unselect all" button is clicked', () => {
        vi.mocked(useSelectedDropdown).mockReturnValue({
            filteredSelectedItems: [{ id: '1', description: '', title: '' }],
            onResetSelected: mockOnResetSelected,
            onDownload: mockOnDownload,
        });

        render(<SelectedDropdown />);

        const unselectButton = screen.getByText(/unselect all/i);
        fireEvent.click(unselectButton);

        expect(mockOnResetSelected).toHaveBeenCalled();
    });

    it('calls onDownload when "Download" button is clicked', () => {
        vi.mocked(useSelectedDropdown).mockReturnValue({
            filteredSelectedItems: [{ id: '1', description: '', title: '' }],
            onResetSelected: mockOnResetSelected,
            onDownload: mockOnDownload,
        });

        render(<SelectedDropdown />);

        const downloadButton = screen.getByText(/download/i);
        fireEvent.click(downloadButton);

        expect(mockOnDownload).toHaveBeenCalled();
    });
});
