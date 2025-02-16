import { createRoot } from 'react-dom/client';
import App from './app/app.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
