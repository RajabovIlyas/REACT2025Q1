import './styles/styles.css';
import Home from '../pages/Home.tsx';
import ErrorBoundary from '../shared/ErrorBoundary.tsx';

const App = () => {
    return (
        <ErrorBoundary>
            <Home />
        </ErrorBoundary>
    );
};

export default App;
