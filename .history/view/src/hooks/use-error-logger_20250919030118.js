import { useCallback } from 'react';

/**
 * Custom hook for error logging
 * Provides centralized error logging functionality
 */
const useErrorLogger = () => {
  const logError = useCallback((error, errorInfo, errorId) => {
    const errorData = {
      errorId,
      message: error?.message || 'Unknown error',
      stack: error?.stack || 'No stack trace available',
      componentStack: errorInfo?.componentStack || 'No component stack available',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: localStorage.getItem('userId') || 'anonymous',
      sessionId: sessionStorage.getItem('sessionId') || 'unknown'
    };

    // Log to console in development
    if (import.meta.env.DEV) {
      console.group('🚨 Error Boundary Caught Error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Error Data:', errorData);
      console.groupEnd();
    }

    // Log to external service (implement based on your needs)
    logToExternalService(errorData);

    // Store error in localStorage for debugging
    storeErrorLocally(errorData);
  }, []);

  const logToExternalService = (errorData) => {
    // Example implementations for different error tracking services:
    
    // 1. Sentry
    // if (window.Sentry) {
    //   window.Sentry.captureException(error, {
    //     tags: { errorId: errorData.errorId },
    //     extra: errorData
    //   });
    // }

    // 2. LogRocket
    // if (window.LogRocket) {
    //   window.LogRocket.captureException(error);
    // }

    // 3. Custom API endpoint
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // }).catch(console.error);

    // 4. Google Analytics (if configured)
    // if (window.gtag) {
    //   window.gtag('event', 'exception', {
    //     description: errorData.message,
    //     fatal: false,
    //     custom_map: { error_id: errorData.errorId }
    //   });
    // }

    console.log('Error logged to external service:', errorData);
  };

  const storeErrorLocally = (errorData) => {
    try {
      const existingErrors = JSON.parse(localStorage.getItem('appErrors') || '[]');
      existingErrors.unshift(errorData);
      
      // Keep only the last 10 errors
      const recentErrors = existingErrors.slice(0, 10);
      localStorage.setItem('appErrors', JSON.stringify(recentErrors));
    } catch (error) {
      console.error('Failed to store error locally:', error);
    }
  };

  const getStoredErrors = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem('appErrors') || '[]');
    } catch (error) {
      console.error('Failed to retrieve stored errors:', error);
      return [];
    }
  }, []);

  const clearStoredErrors = useCallback(() => {
    try {
      localStorage.removeItem('appErrors');
    } catch (error) {
      console.error('Failed to clear stored errors:', error);
    }
  }, []);

  return {
    logError,
    getStoredErrors,
    clearStoredErrors
  };
};

export default useErrorLogger;
