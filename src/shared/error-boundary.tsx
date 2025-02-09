import { Component, ErrorInfo, ReactNode } from 'react';
import axios from 'axios';
import Page404 from '../pages/page-404/page-404.tsx';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: unknown;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: unknown) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (axios.isAxiosError(this.state.error)) {
            return <Page404 />;
        }
        if (this.state.hasError) {
            return (
                <div className="text-center text-red-500 p-6 bg-red-50 rounded-md">
                    Something went wrong.
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
