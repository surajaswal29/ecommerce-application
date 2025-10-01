/**
 * Snackbar Constants
 * Action types and other constants for Snackbar functionality
 */

export const SNACKBAR_ACTIONS = {
  SHOW_SUCCESS: 'SHOW_SUCCESS',
  SHOW_ERROR: 'SHOW_ERROR',
  SHOW_WARNING: 'SHOW_WARNING',
  SHOW_INFO: 'SHOW_INFO',
  HIDE: 'HIDE',
};

export const SNACKBAR_SEVERITY = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const SNACKBAR_DURATION = {
  SUCCESS: 6000,
  ERROR: 8000,
  WARNING: 6000,
  INFO: 4000,
};

export default {
  SNACKBAR_ACTIONS,
  SNACKBAR_SEVERITY,
  SNACKBAR_DURATION,
};
