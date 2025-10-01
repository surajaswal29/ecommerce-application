/**
 * Error Logger Utility
 * Centralized error logging functionality for the application
 */

/**
 * Log error to various services and local storage
 * @param {Error} error - The error object
 * @param {Object} errorInfo - Additional error information
 * @param {string} errorId - Unique error identifier
 */
export const logError = (error, errorInfo, errorId) => {
  const errorData = {
    errorId,
    message: error?.message || 'Unknown error',
    stack: error?.stack || 'No stack trace available',
    componentStack: errorInfo?.componentStack || 'No component stack available',
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    userId: localStorage.getItem('userId') || 'anonymous',
    sessionId: sessionStorage.getItem('sessionId') || 'unknown',
  };

  // Log to console in development
  if (import.meta.env.DEV) {
    console.group('🚨 Error Boundary Caught Error');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Error Data:', errorData);
    console.groupEnd();
  }

  // Log to external service
  logToExternalService(error, errorData);

  // Store error locally for debugging
  storeErrorLocally(errorData);
};

/**
 * Log error to external services
 * @param {Error} error - The error object
 * @param {Object} errorData - Formatted error data
 */
const logToExternalService = (error, errorData) => {
  // Example implementations for different error tracking services:

  // 1. Sentry
  if (window.Sentry) {
    window.Sentry.captureException(error, {
      tags: { errorId: errorData.errorId },
      extra: errorData,
    });
  }

  // 2. LogRocket
  if (window.LogRocket) {
    window.LogRocket.captureException(error);
  }

  // 3. Custom API endpoint
  // Uncomment and modify based on your backend API
  // fetch('/api/errors', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(errorData)
  // }).catch(console.error);

  // 4. Google Analytics (if configured)
  if (window.gtag) {
    window.gtag('event', 'exception', {
      description: errorData.message,
      fatal: false,
      custom_map: { error_id: errorData.errorId },
    });
  }

  // 5. Console fallback
  console.log('Error logged to external service:', errorData);
};

/**
 * Store error in localStorage for debugging
 * @param {Object} errorData - Formatted error data
 */
const storeErrorLocally = (errorData) => {
  try {
    const existingErrors = JSON.parse(
      localStorage.getItem('appErrors') || '[]'
    );
    existingErrors.unshift(errorData);

    // Keep only the last 10 errors
    const recentErrors = existingErrors.slice(0, 10);
    localStorage.setItem('appErrors', JSON.stringify(recentErrors));
  } catch (error) {
    console.error('Failed to store error locally:', error);
  }
};

/**
 * Get stored errors from localStorage
 * @returns {Array} Array of stored errors
 */
export const getStoredErrors = () => {
  try {
    return JSON.parse(localStorage.getItem('appErrors') || '[]');
  } catch (error) {
    console.error('Failed to retrieve stored errors:', error);
    return [];
  }
};

/**
 * Clear stored errors from localStorage
 */
export const clearStoredErrors = () => {
  try {
    localStorage.removeItem('appErrors');
  } catch (error) {
    console.error('Failed to clear stored errors:', error);
  }
};

/**
 * Generate a unique error ID
 * @returns {string} Unique error identifier
 */
export const generateErrorId = () => {
  return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
