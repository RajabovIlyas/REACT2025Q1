import './styles/styles.css';
import Home from '../pages/home/home.tsx';
import ErrorBoundary from '../shared/error-boundary/error-boundary.tsx';
import { Route, Routes } from 'react-router';
import Page404 from '../pages/page-404/page-404.tsx';

const App = () => {
    return (
        <ErrorBoundary>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </ErrorBoundary>
    );
};

export default App;
