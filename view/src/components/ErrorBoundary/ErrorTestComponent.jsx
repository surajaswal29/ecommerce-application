import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';

/**
 * Test Component for Error Boundary
 * This component can be used to test the error boundary functionality
 * Add this to any route temporarily to test error handling
 */
const ErrorTestComponent = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  // This will cause an error when shouldThrowError is true
  if (shouldThrowError) {
    throw new Error('This is a test error to demonstrate the Error Boundary!');
  }

  const triggerError = () => {
    setShouldThrowError(true);
  };

  const triggerAsyncError = () => {
    // Simulate an async error
    setTimeout(() => {
      throw new Error('This is an async test error!');
    }, 1000);
  };

  const triggerPromiseRejection = () => {
    // Simulate a promise rejection
    Promise.reject(new Error('This is a promise rejection test error!'));
  };

  return (
    <div className='error-test-component p-4'>
      <Alert variant='warning'>
        <h4>Error Boundary Test Component</h4>
        <p>
          This component is for testing the Error Boundary functionality. Click
          the buttons below to trigger different types of errors.
        </p>
      </Alert>

      <div className='d-grid gap-2'>
        <Button variant='danger' onClick={triggerError} className='mb-2'>
          Trigger Synchronous Error
        </Button>

        <Button variant='warning' onClick={triggerAsyncError} className='mb-2'>
          Trigger Async Error (won't be caught by Error Boundary)
        </Button>

        <Button
          variant='info'
          onClick={triggerPromiseRejection}
          className='mb-2'
        >
          Trigger Promise Rejection (won't be caught by Error Boundary)
        </Button>
      </div>

      <Alert variant='info' className='mt-3'>
        <small>
          <strong>Note:</strong> Error Boundary only catches errors in React
          components during rendering, lifecycle methods, and constructors. It
          does not catch errors in event handlers, async code, or during
          server-side rendering.
        </small>
      </Alert>
    </div>
  );
};

export default ErrorTestComponent;
