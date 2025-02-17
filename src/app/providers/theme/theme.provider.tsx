import React, { ReactNode, useState } from 'react';
import { SiteTheme } from '../../../entities/theme';
import { ThemeContext } from './theme.contex.ts';
import { Theme } from '../../../entities/theme/theme.type.ts';

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(SiteTheme.LIGHT);

    const toggleTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
