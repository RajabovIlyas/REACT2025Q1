import { fireEvent, render, screen } from '@testing-library/react';
import ThemeSwitch from './theme-switch.tsx';
import { useTheme } from '../../app/providers/theme';
import { SiteTheme } from '../../entities/theme';
import { vi } from 'vitest';

vi.mock('../../app/providers/theme');

describe('ThemeSwitch', () => {
    const mockToggleTheme = vi.fn();

    beforeEach(() => {
        vi.mocked(useTheme).mockReturnValue({
            theme: SiteTheme.LIGHT,
            toggleTheme: mockToggleTheme,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders with the correct initial theme', () => {
        render(<ThemeSwitch />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    it('toggles theme when checkbox is clicked', () => {
        vi.mocked(useTheme).mockReturnValueOnce({
            theme: SiteTheme.DARK,
            toggleTheme: mockToggleTheme,
        });

        render(<ThemeSwitch />);

        const checkbox = screen.getByRole('checkbox');

        expect(checkbox).not.toBeChecked();

        fireEvent.click(checkbox);

        expect(mockToggleTheme).toHaveBeenCalledWith(SiteTheme.LIGHT);
    });

    it('toggles theme back to DARK when checkbox is clicked again', () => {
        render(<ThemeSwitch />);

        const checkbox = screen.getByRole('checkbox');

        fireEvent.click(checkbox);

        expect(mockToggleTheme).toHaveBeenCalledWith(SiteTheme.DARK);
    });
});
