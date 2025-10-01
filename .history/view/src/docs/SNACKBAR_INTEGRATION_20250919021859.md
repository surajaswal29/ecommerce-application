# Snackbar Integration Documentation

This document describes the comprehensive Snackbar system implemented using
Material-UI for displaying success and error messages from API calls.

## Overview

The Snackbar system provides a centralized way to display notifications
throughout the application. It includes:

- **Context-based state management** for global Snackbar control
- **Custom hooks** for easy usage in components
- **API integration** with automatic success/error handling
- **Material-UI components** for consistent styling
- **TypeScript support** with proper type definitions

## Architecture

### 1. SnackbarContext (`contexts/SnackbarContext.jsx`)

- Provides global state management for Snackbar
- Handles different message types (success, error, warning, info)
- Manages auto-hide duration and positioning
- Uses Material-UI Snackbar and Alert components

### 2. Custom Hook (`hooks/use-snackbar.js`)

- Provides convenient methods for showing messages
- Includes API integration helpers
- Supports async operation handling
- Offers customizable message options

### 3. Enhanced API Service (`service/enhancedApiService.js`)

- Wraps existing API services with Snackbar integration
- Provides automatic success/error notifications
- Customizable messages for different operations
- Maintains existing API functionality

### 4. Utility Functions (`utils/api-with-snackbar.js`)

- Generic utilities for API + Snackbar integration
- Higher-order functions for enhancing API calls
- Flexible configuration options

## Usage

### Basic Usage

```jsx
import { useSnackbar } from '../hooks/use-snackbar';

const MyComponent = () => {
  const { success, error, warning, info } = useSnackbar();

  const handleSuccess = () => {
    success('Operation completed successfully!');
  };

  const handleError = () => {
    error('Something went wrong!');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
};
```

### API Integration

```jsx
import { useEnhancedApiServices } from '../service/enhancedApiService';

const MyComponent = () => {
  const { user, product } = useEnhancedApiServices();

  const handleLogin = async (credentials) => {
    try {
      await user.login(credentials);
      // Success message shown automatically
    } catch (error) {
      // Error message shown automatically
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      await product.createProduct(productData);
      // Success message: "Product created successfully!"
    } catch (error) {
      // Error message: "Failed to create product. Please try again."
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleCreateProduct}>Create Product</button>
    </div>
  );
};
```

### Custom Async Handling

```jsx
import { useSnackbar } from '../hooks/use-snackbar';

const MyComponent = () => {
  const { handleAsync } = useSnackbar();

  const handleAsyncOperation = async () => {
    await handleAsync(() => myApiCall(), {
      successMessage: 'Custom success message!',
      errorMessage: 'Custom error message!',
      showLoading: true,
      onSuccess: (result) => console.log('Success:', result),
      onError: (error) => console.log('Error:', error),
    });
  };

  return <button onClick={handleAsyncOperation}>Async Operation</button>;
};
```

## Configuration

### Snackbar Positioning

The Snackbar is positioned at the top-right of the screen with a margin-top to
account for the header:

```jsx
<Snackbar
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  sx={{ mt: 8 }} // Adjust margin-top as needed
>
```

### Auto-hide Duration

Different message types have different auto-hide durations:

- **Success**: 6 seconds
- **Error**: 8 seconds (longer for important messages)
- **Warning**: 6 seconds
- **Info**: 4 seconds

### Custom Duration

You can override the default duration:

```jsx
const { success } = useSnackbar();
success('Message', 10000); // 10 seconds
```

## Integration Points

### 1. App Component

The SnackbarProvider wraps the entire application:

```jsx
// App.jsx
import { SnackbarProvider } from './contexts/SnackbarContext';

const App = () => {
  return (
    <SnackbarProvider>
      <Router>{/* Your app routes */}</Router>
    </SnackbarProvider>
  );
};
```

### 2. Authentication Flows

Login and signup components automatically show success/error messages:

```jsx
// login.jsx
const { error: showError, success: showSuccess } = useSnackbar();

useEffect(() => {
  if (error) {
    showError(error);
    clearError();
  }
  if (isAuthenticated) {
    showSuccess('Login successful!');
    navigate(redirect);
  }
}, [error, isAuthenticated, showError, showSuccess]);
```

### 3. File Upload

Image upload component shows progress and results:

```jsx
// ImageUpload.jsx
const { success: showSuccess, error: showError } = useSnackbar();

// On successful upload
if (response.data.success) {
  const successMessage = response.data.message || 'Upload successful!';
  showSuccess(successMessage);
}

// On upload error
catch (error) {
  const errorMessage = error.response?.data?.message || error.message || 'Upload failed';
  showError(errorMessage);
}
```

## API Service Enhancement

### Enhanced API Services

The enhanced API services provide automatic Snackbar integration:

```jsx
// Enhanced User API
export const useEnhancedUserApi = () => {
  const enhancedUserApi = useApiWithSnackbar(userApi);

  return {
    ...enhancedUserApi,
    register: (userData) =>
      enhancedUserApi.register(userData, {
        successMessage: 'Registration successful! Welcome to our platform.',
        errorMessage: 'Registration failed. Please try again.',
      }),
    // ... other methods
  };
};
```

### Custom API Calls

You can create custom API calls with specific Snackbar behavior:

```jsx
import { createApiCall } from '../utils/api-with-snackbar';

const customApiCall = createApiCall(originalApiCall, {
  successMessage: 'Custom success!',
  errorMessage: 'Custom error!',
  showSuccess: true,
  showError: true,
});
```

## Styling

The Snackbar uses Material-UI's Alert component with the "filled" variant for
better visibility:

```jsx
<Alert
  onClose={handleClose}
  severity={state.severity}
  variant='filled'
  sx={{ width: '100%' }}
>
  {state.message}
</Alert>
```

## Best Practices

1. **Use appropriate message types**:

   - `success` for completed operations
   - `error` for failures and errors
   - `warning` for important notices
   - `info` for general information

2. **Provide meaningful messages**:

   - Be specific about what happened
   - Include actionable information when possible
   - Avoid technical jargon for user-facing messages

3. **Handle API errors consistently**:

   - Use enhanced API services for automatic handling
   - Provide fallback messages for unexpected errors
   - Log errors for debugging while showing user-friendly messages

4. **Consider user experience**:
   - Don't show too many notifications at once
   - Use appropriate durations for different message types
   - Allow users to dismiss messages manually

## Troubleshooting

### Common Issues

1. **Snackbar not showing**:

   - Ensure SnackbarProvider wraps your app
   - Check that useSnackbar is called within a component tree that has
     SnackbarProvider

2. **Messages not appearing**:

   - Verify the message is not empty
   - Check console for any JavaScript errors
   - Ensure Material-UI is properly installed

3. **API integration not working**:
   - Make sure you're using the enhanced API services
   - Check that the API call is properly wrapped
   - Verify error handling in your API calls

### Debug Mode

You can enable debug mode by adding console logs in the Snackbar context:

```jsx
const showSuccess = (message, duration) => {
  console.log('Showing success message:', message);
  dispatch({
    type: SNACKBAR_ACTIONS.SHOW_SUCCESS,
    payload: { message, duration },
  });
};
```

## Examples

See `components/Example/SnackbarExample.jsx` for comprehensive examples of all
Snackbar features and usage patterns.

## Migration Guide

### From Alert/Console.log

Replace:

```jsx
// Old way
alert('Error message');
console.log('Success message');
```

With:

```jsx
// New way
const { success, error } = useSnackbar();
success('Success message');
error('Error message');
```

### From Custom Error Handling

Replace:

```jsx
// Old way
try {
  await apiCall();
  // Custom success handling
} catch (error) {
  // Custom error handling
}
```

With:

```jsx
// New way
const { user } = useEnhancedApiServices();
try {
  await user.someMethod();
  // Success message shown automatically
} catch (error) {
  // Error message shown automatically
}
```

This Snackbar system provides a robust, user-friendly way to display
notifications throughout your application while maintaining consistency and ease
of use.
