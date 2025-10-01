import { useSnackbar as useSnackbarContext } from '../contexts/SnackbarContext';

/**
 * Custom hook for easy Snackbar usage
 * Provides convenient methods for showing different types of messages
 */
export const useSnackbar = () => {
  const { showSuccess, showError, showWarning, showInfo, hideSnackbar } =
    useSnackbarContext();

  return {
    // Success messages
    success: (message, duration) => showSuccess(message, duration),

    // Error messages
    error: (message, duration) => showError(message, duration),

    // Warning messages
    warning: (message, duration) => showWarning(message, duration),

    // Info messages
    info: (message, duration) => showInfo(message, duration),

    // Hide current snackbar
    hide: hideSnackbar,

    // Convenience methods for API responses
    handleApiSuccess: (response, customMessage) => {
      const message =
        customMessage ||
        response?.data?.message ||
        'Operation completed successfully';
      showSuccess(message);
    },

    handleApiError: (error, customMessage) => {
      const message =
        customMessage ||
        error?.response?.data?.message ||
        error?.message ||
        'An error occurred';
      showError(message);
    },

    // Handle async operations with automatic success/error handling
    handleAsync: async (asyncFn, options = {}) => {
      const {
        successMessage = 'Operation completed successfully',
        errorMessage = null,
        showLoading = false,
        onSuccess = null,
        onError = null,
      } = options;

      try {
        if (showLoading) {
          showInfo('Processing...', 0); // Show loading message that doesn't auto-hide
        }

        const result = await asyncFn();

        if (showLoading) {
          hideSnackbar(); // Hide loading message
        }

        showSuccess(successMessage);

        if (onSuccess) {
          onSuccess(result);
        }

        return result;
      } catch (error) {
        if (showLoading) {
          hideSnackbar(); // Hide loading message
        }

        const message =
          errorMessage ||
          error?.response?.data?.message ||
          error?.message ||
          'An error occurred';
        showError(message);

        if (onError) {
          onError(error);
        }

        throw error;
      }
    },
  };
};

export default useSnackbar;
