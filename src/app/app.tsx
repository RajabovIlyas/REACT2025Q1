import './styles/styles.css';
import Home from '../pages/home/home.tsx';
import ErrorBoundary from '../shared/error-boundary/error-boundary.tsx';
import { Route, Routes } from 'react-router';
import Page404 from '../pages/page-404/page-404.tsx';
import CardDetails from '../features/people-details/card-details.tsx';
import { Providers } from './providers';

const App = () => {
    return (
        <ErrorBoundary>
            <Providers>
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route
                            path="details/:personId"
                            element={<CardDetails />}
                        />
                    </Route>
                    <Route path="*" element={<Page404 />} />
                </Routes>
            </Providers>
        </ErrorBoundary>
    );
};

export default App;
