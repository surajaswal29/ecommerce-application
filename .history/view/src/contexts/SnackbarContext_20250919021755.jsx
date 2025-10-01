import React, { createContext, useContext, useReducer } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { SNACKBAR_ACTIONS } from '../constants/snackbarConstants';

// Snackbar context
const SnackbarContext = createContext();

// Initial state
const initialState = {
  open: false,
  message: '',
  severity: 'info', // 'success', 'error', 'warning', 'info'
  duration: 6000, // Auto-hide duration in ms
};

// Reducer
const snackbarReducer = (state, action) => {
  switch (action.type) {
    case SNACKBAR_ACTIONS.SHOW_SUCCESS:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        severity: 'success',
        duration: action.payload.duration || 6000,
      };
    case SNACKBAR_ACTIONS.SHOW_ERROR:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        severity: 'error',
        duration: action.payload.duration || 8000, // Longer duration for errors
      };
    case SNACKBAR_ACTIONS.SHOW_WARNING:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        severity: 'warning',
        duration: action.payload.duration || 6000,
      };
    case SNACKBAR_ACTIONS.SHOW_INFO:
      return {
        ...state,
        open: true,
        message: action.payload.message,
        severity: 'info',
        duration: action.payload.duration || 4000,
      };
    case SNACKBAR_ACTIONS.HIDE:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

// Snackbar provider component
export const SnackbarProvider = ({ children }) => {
  const [state, dispatch] = useReducer(snackbarReducer, initialState);

  // Action creators
  const showSuccess = (message, duration) => {
    dispatch({
      type: SNACKBAR_ACTIONS.SHOW_SUCCESS,
      payload: { message, duration },
    });
  };

  const showError = (message, duration) => {
    dispatch({
      type: SNACKBAR_ACTIONS.SHOW_ERROR,
      payload: { message, duration },
    });
  };

  const showWarning = (message, duration) => {
    dispatch({
      type: SNACKBAR_ACTIONS.SHOW_WARNING,
      payload: { message, duration },
    });
  };

  const showInfo = (message, duration) => {
    dispatch({
      type: SNACKBAR_ACTIONS.SHOW_INFO,
      payload: { message, duration },
    });
  };

  const hideSnackbar = () => {
    dispatch({ type: SNACKBAR_ACTIONS.HIDE });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    hideSnackbar();
  };

  const value = {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    hideSnackbar,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={state.open}
        autoHideDuration={state.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }} // Add margin top to account for header
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Custom hook to use snackbar
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export default SnackbarContext;
