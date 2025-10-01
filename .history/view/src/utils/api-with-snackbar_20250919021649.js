/**
 * API utility functions with automatic Snackbar integration
 * Provides enhanced API calls that automatically show success/error messages
 */

import { useSnackbar } from '../hooks/use-snackbar';

/**
 * Enhanced API call wrapper that automatically handles Snackbar notifications
 * @param {Function} apiCall - The API function to call
 * @param {Object} options - Configuration options
 * @param {string} options.successMessage - Custom success message
 * @param {string} options.errorMessage - Custom error message
 * @param {boolean} options.showSuccess - Whether to show success message (default: true)
 * @param {boolean} options.showError - Whether to show error message (default: true)
 * @param {Function} options.onSuccess - Success callback
 * @param {Function} options.onError - Error callback
 * @returns {Promise} Enhanced API call result
 */
export const withSnackbar = (apiCall, options = {}) => {
  const {
    successMessage = null,
    errorMessage = null,
    showSuccess = true,
    showError = true,
    onSuccess = null,
    onError = null,
  } = options;

  return async (...args) => {
    try {
      const result = await apiCall(...args);
      
      if (showSuccess) {
        // Use the snackbar context if available
        if (window.snackbarContext) {
          const message = successMessage || result?.data?.message || 'Operation completed successfully';
          window.snackbarContext.showSuccess(message);
        }
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      if (showError) {
        // Use the snackbar context if available
        if (window.snackbarContext) {
          const message = errorMessage || 
            error?.response?.data?.message || 
            error?.message || 
            'An error occurred';
          window.snackbarContext.showError(message);
        }
      }
      
      if (onError) {
        onError(error);
      }
      
      throw error;
    }
  };
};

/**
 * Hook to get enhanced API functions with Snackbar integration
 * @param {Object} apiService - The API service object
 * @returns {Object} Enhanced API service with Snackbar integration
 */
export const useApiWithSnackbar = (apiService) => {
  const snackbar = useSnackbar();
  
  // Store snackbar context globally for use in withSnackbar
  if (typeof window !== 'undefined') {
    window.snackbarContext = snackbar;
  }
  
  // Create enhanced API functions
  const enhancedApi = {};
  
  Object.keys(apiService).forEach(key => {
    if (typeof apiService[key] === 'function') {
      enhancedApi[key] = withSnackbar(apiService[key], {
        showSuccess: true,
        showError: true,
      });
    } else {
      enhancedApi[key] = apiService[key];
    }
  });
  
  return enhancedApi;
};

/**
 * Create a custom API call with specific Snackbar behavior
 * @param {Function} apiCall - The API function to call
 * @param {Object} snackbarConfig - Snackbar configuration
 * @returns {Function} Enhanced API call function
 */
export const createApiCall = (apiCall, snackbarConfig = {}) => {
  return withSnackbar(apiCall, snackbarConfig);
};

export default {
  withSnackbar,
  useApiWithSnackbar,
  createApiCall,
};
