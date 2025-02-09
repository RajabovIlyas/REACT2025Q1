import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './search-bar.tsx';
import { useSearchBar } from './search-bar.hook';
import { vi } from 'vitest';

vi.mock('./search-bar.hook', () => ({
    useSearchBar: vi.fn(),
}));

describe('search-bar component', () => {
    const mockOnSearch = vi.fn();

    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
        vi.mocked(useSearchBar).mockReturnValue({
            query: '',
            handleSearch: mockOnSearch,
            handleInputChange: vi.fn(),
        });
    });

    it('renders the input and button', () => {
        render(<SearchBar onSearch={mockOnSearch} />);
        expect(
            screen.getByPlaceholderText('Enter search term...'),
        ).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    it('updates the input value when typing', () => {
        const handleInputChangeMock = vi.fn();
        vi.mocked(useSearchBar).mockReturnValue({
            query: 'test',
            handleSearch: mockOnSearch,
            handleInputChange: handleInputChangeMock,
        });

        render(<SearchBar onSearch={mockOnSearch} />);

        const input = screen.getByPlaceholderText('Enter search term...');
        fireEvent.change(input, { target: { value: 'new query' } });

        expect(handleInputChangeMock).toHaveBeenCalledWith(expect.any(Object));
    });

    it('calls onSearch when the search button is clicked', () => {
        render(<SearchBar onSearch={mockOnSearch} />);

        const button = screen.getByText('Search');
        fireEvent.click(button);

        expect(mockOnSearch).toHaveBeenCalled();
    });

    it('displays the current query in the input', () => {
        vi.mocked(useSearchBar).mockReturnValue({
            query: 'test query',
            handleSearch: mockOnSearch,
            handleInputChange: vi.fn(),
        });

        render(<SearchBar onSearch={mockOnSearch} />);
        const input = screen.getByPlaceholderText('Enter search term...');
        expect(input).toHaveValue('test query');
    });
});
