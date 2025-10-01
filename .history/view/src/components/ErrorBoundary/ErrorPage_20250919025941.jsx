import React, { useState } from 'react';
import { Button, Container, Row, Col, Alert, Collapse } from 'react-bootstrap';
import { FaExclamationTriangle, FaHome, FaRedo, FaBug, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './ErrorPage.css';

/**
 * Error Page Component
 * Displays a user-friendly error page with options to retry or go home
 */
const ErrorPage = ({ 
  error, 
  errorInfo, 
  errorId, 
  onRetry, 
  onGoHome 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const copyErrorDetails = () => {
    const errorDetails = `
Error ID: ${errorId}
Error Message: ${error?.message || 'Unknown error'}
Error Stack: ${error?.stack || 'No stack trace available'}
Component Stack: ${errorInfo?.componentStack || 'No component stack available'}
Timestamp: ${new Date().toISOString()}
URL: ${window.location.href}
    `.trim();

    navigator.clipboard.writeText(errorDetails).then(() => {
      alert('Error details copied to clipboard!');
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = errorDetails;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Error details copied to clipboard!');
    });
  };

  return (
    <div className="error-page">
      <Container className="error-container">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="error-content text-center">
              {/* Error Icon */}
              <div className="error-icon">
                <FaExclamationTriangle />
              </div>

              {/* Error Title */}
              <h1 className="error-title">Oops! Something went wrong</h1>
              
              {/* Error Message */}
              <p className="error-message">
                We're sorry, but something unexpected happened. Our team has been notified and is working to fix this issue.
              </p>

              {/* Error ID */}
              {errorId && (
                <Alert variant="info" className="error-id-alert">
                  <strong>Error ID:</strong> {errorId}
                  <br />
                  <small>Please include this ID when contacting support.</small>
                </Alert>
              )}

              {/* Action Buttons */}
              <div className="error-actions">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={onRetry}
                  className="me-3"
                >
                  <FaRedo className="me-2" />
                  Try Again
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="lg" 
                  onClick={onGoHome}
                >
                  <FaHome className="me-2" />
                  Go Home
                </Button>
              </div>

              {/* Technical Details Toggle */}
              <div className="error-details-section mt-4">
                <Button
                  variant="link"
                  onClick={toggleDetails}
                  className="details-toggle-btn"
                >
                  <FaBug className="me-2" />
                  {showDetails ? 'Hide' : 'Show'} Technical Details
                  {showDetails ? <FaChevronUp className="ms-2" /> : <FaChevronDown className="ms-2" />}
                </Button>

                <Collapse in={showDetails}>
                  <div className="error-details">
                    <Alert variant="light" className="text-start">
                      <h6>Error Details:</h6>
                      <pre className="error-stack">
                        <strong>Error Message:</strong> {error?.message || 'No error message available'}
                        {'\n\n'}
                        <strong>Error Stack:</strong>
                        {error?.stack || 'No stack trace available'}
                        {'\n\n'}
                        <strong>Component Stack:</strong>
                        {errorInfo?.componentStack || 'No component stack available'}
                      </pre>
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={copyErrorDetails}
                      >
                        Copy Error Details
                      </Button>
                    </Alert>
                  </div>
                </Collapse>
              </div>

              {/* Help Section */}
              <div className="error-help mt-4">
                <h6>Need Help?</h6>
                <p className="text-muted">
                  If this problem persists, please contact our support team with the Error ID above.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ErrorPage;
