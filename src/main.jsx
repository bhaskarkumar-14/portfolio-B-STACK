import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
          <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-lg shadow-xl border border-red-500/20">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
            <pre className="bg-black/50 p-4 rounded text-sm overflow-auto text-red-200">
              {this.state.error && this.state.error.toString()}
            </pre>
            <p className="mt-4 text-gray-400">Please verify the code changes or imports.</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

console.log("Mounting React App...");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <Router>
          <App />
        </Router>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>,
)
