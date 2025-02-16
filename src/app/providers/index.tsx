import { store } from '../../shared/lib/store/store.ts';
import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import ThemeProvider from './theme';

type ProvidersProps = {
    children: ReactNode;
};

export const Providers: FC<ProvidersProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <Provider store={store}>{children}</Provider>
        </ThemeProvider>
    );
};
