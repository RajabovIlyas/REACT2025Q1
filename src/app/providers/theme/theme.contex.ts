import { createContext } from 'react';
import { Theme } from '../../../entities/theme/theme.type.ts';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: (newTheme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined,
);
