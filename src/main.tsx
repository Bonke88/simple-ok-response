
import { createRoot } from 'react-dom/client';
import { StrictMode, ErrorBoundary as ReactErrorBoundary } from 'react';
import App from './App.tsx';
import './index.css';

// Simple error boundary component for development
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  console.error('Application error:', error);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
        <div className="bg-gray-100 p-4 rounded mb-4 overflow-auto max-h-60">
          <pre className="text-sm text-gray-800">{error.message}</pre>
          <pre className="text-xs text-gray-600 mt-2">{error.stack}</pre>
        </div>
        <button
          onClick={resetErrorBoundary}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Try again
        </button>
        <p className="text-sm text-gray-500 mt-4">
          If this error persists, please check the console for more details or contact support.
        </p>
      </div>
    </div>
  );
};

// Custom error boundary wrapper
class ErrorBoundary extends ReactErrorBoundary {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return <ErrorFallback error={(this.state as any).error} resetErrorBoundary={() => this.setState({ hasError: false })} />;
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
