import React from 'react';
import { Component } from 'react';
import ErrorPage from './ErrorPage';
import useErrorLogger from '../../hooks/use-error-logger';

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Generate a unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to external service (you can integrate with services like Sentry, LogRocket, etc.)
    this.logErrorToService(error, errorInfo, errorId);
    
    this.setState({
      error,
      errorInfo,
      errorId
    });
  }

  logErrorToService = (error, errorInfo, errorId) => {
    // You can integrate with error tracking services here
    // Example: Sentry, LogRocket, Bugsnag, etc.
    
    const errorData = {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // For now, we'll just log to console
    // In production, send this to your error tracking service
    console.log('Error logged:', errorData);
    
    // Example: Send to your backend API
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // }).catch(console.error);
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null
    });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          errorId={this.state.errorId}
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
