import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useSnackbar } from '../../hooks/use-snackbar';
import { useEnhancedApiServices } from '../../service/enhancedApiService';

/**
 * Snackbar Example Component
 * Demonstrates all the Snackbar features and usage patterns
 */
const SnackbarExample = () => {
  const { success, error, warning, info, handleAsync } = useSnackbar();
  const { user, product, cart } = useEnhancedApiServices();
  const [loading, setLoading] = useState(false);

  // Basic Snackbar examples
  const showBasicMessages = () => {
    success('This is a success message!');
    setTimeout(() => error('This is an error message!'), 1000);
    setTimeout(() => warning('This is a warning message!'), 2000);
    setTimeout(() => info('This is an info message!'), 3000);
  };

  // API integration examples
  const testApiSuccess = async () => {
    try {
      // Simulate a successful API call
      await handleAsync(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ data: { message: 'API call successful!' } }),
              1000
            )
          ),
        {
          successMessage: 'Custom success message!',
          showLoading: true,
        }
      );
    } catch (err) {
      // Error is automatically handled by handleAsync
    }
  };

  const testApiError = async () => {
    try {
      // Simulate a failed API call
      await handleAsync(
        () =>
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error('API call failed!')), 1000)
          ),
        {
          errorMessage: 'Custom error message!',
          showLoading: true,
        }
      );
    } catch (err) {
      // Error is automatically handled by handleAsync
    }
  };

  // Real API examples (these will show actual API responses)
  const testRealApi = async () => {
    setLoading(true);
    try {
      // This will show success/error messages based on actual API response
      await user.getMyDetails();
    } catch (err) {
      // Error is automatically handled by enhanced API
    } finally {
      setLoading(false);
    }
  };

  const testProductApi = async () => {
    setLoading(true);
    try {
      // This will show success/error messages based on actual API response
      await product.getAllProducts({ page: 1, limit: 10 });
    } catch (err) {
      // Error is automatically handled by enhanced API
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Snackbar Examples
      </Typography>
      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        This component demonstrates all the Snackbar features and usage
        patterns.
      </Typography>

      <Grid container spacing={3}>
        {/* Basic Messages */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Basic Messages
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Test different types of Snackbar messages
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={showBasicMessages}
                sx={{ mr: 1, mb: 1 }}
              >
                Show All Messages
              </Button>
              <Button
                variant='contained'
                color='success'
                onClick={() => success('Success message!')}
                sx={{ mr: 1, mb: 1 }}
              >
                Success
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={() => error('Error message!')}
                sx={{ mr: 1, mb: 1 }}
              >
                Error
              </Button>
              <Button
                variant='contained'
                color='warning'
                onClick={() => warning('Warning message!')}
                sx={{ mr: 1, mb: 1 }}
              >
                Warning
              </Button>
              <Button
                variant='contained'
                color='info'
                onClick={() => info('Info message!')}
                sx={{ mr: 1, mb: 1 }}
              >
                Info
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* API Integration */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                API Integration
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Test Snackbar integration with API calls
              </Typography>
              <Button
                variant='contained'
                color='primary'
                onClick={testApiSuccess}
                disabled={loading}
                sx={{ mr: 1, mb: 1 }}
              >
                Test API Success
              </Button>
              <Button
                variant='contained'
                color='error'
                onClick={testApiError}
                disabled={loading}
                sx={{ mr: 1, mb: 1 }}
              >
                Test API Error
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={testRealApi}
                disabled={loading}
                sx={{ mr: 1, mb: 1 }}
              >
                Test Real API
              </Button>
              <Button
                variant='contained'
                color='secondary'
                onClick={testProductApi}
                disabled={loading}
                sx={{ mr: 1, mb: 1 }}
              >
                Test Product API
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Usage Examples */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Usage Examples
              </Typography>
              <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
                Code examples for different usage patterns
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Typography variant='subtitle2' gutterBottom>
                  1. Basic Usage:
                </Typography>
                <pre
                  style={{
                    background: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                >
                  {`import { useSnackbar } from '../hooks/use-snackbar';

const MyComponent = () => {
  const { success, error, warning, info } = useSnackbar();

  const handleClick = () => {
    success('Operation successful!');
  };

  return <button onClick={handleClick}>Click me</button>;
};`}
                </pre>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant='subtitle2' gutterBottom>
                  2. API Integration:
                </Typography>
                <pre
                  style={{
                    background: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                >
                  {`import { useEnhancedApiServices } from '../service/enhancedApiService';

const MyComponent = () => {
  const { user } = useEnhancedApiServices();

  const handleLogin = async (credentials) => {
    try {
      await user.login(credentials);
      // Success message shown automatically
    } catch (error) {
      // Error message shown automatically
    }
  };

  return <button onClick={handleLogin}>Login</button>;
};`}
                </pre>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant='subtitle2' gutterBottom>
                  3. Custom Async Handling:
                </Typography>
                <pre
                  style={{
                    background: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                >
                  {`import { useSnackbar } from '../hooks/use-snackbar';

const MyComponent = () => {
  const { handleAsync } = useSnackbar();

  const handleAsyncOperation = async () => {
    await handleAsync(
      () => myApiCall(),
      {
        successMessage: 'Custom success message!',
        errorMessage: 'Custom error message!',
        showLoading: true,
        onSuccess: (result) => console.log('Success:', result),
        onError: (error) => console.log('Error:', error),
      }
    );
  };

  return <button onClick={handleAsyncOperation}>Async Operation</button>;
};`}
                </pre>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SnackbarExample;
