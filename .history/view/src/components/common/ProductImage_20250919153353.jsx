import React, { useState } from 'react';

const ProductImage = ({ 
  src, 
  alt = 'Product', 
  className = '', 
  style = {},
  fallbackSrc = '/placeholder-image.svg',
  showLoading = true,
  ...props 
}) => {
  const [imageState, setImageState] = useState({
    loading: true,
    error: false,
    retryCount: 0
  });

  const maxRetries = 2;

  const handleImageLoad = () => {
    setImageState(prev => ({ ...prev, loading: false, error: false }));
  };

  const handleImageError = () => {
    setImageState(prev => {
      const newRetryCount = prev.retryCount + 1;
      
      if (newRetryCount <= maxRetries) {
        // Retry loading the image
        setTimeout(() => {
          setImageState(prev => ({ ...prev, retryCount: newRetryCount }));
        }, 1000);
        return { ...prev, retryCount: newRetryCount };
      } else {
        // Max retries reached, show fallback
        return { ...prev, loading: false, error: true };
      }
    });
  };

  const getImageSrc = () => {
    if (imageState.error) {
      return fallbackSrc;
    }
    return src || fallbackSrc;
  };

  const getImageKey = () => {
    // Force re-render when retrying
    return `${src}-${imageState.retryCount}`;
  };

  return (
    <div className={`product-image-container ${className}`} style={style}>
      {showLoading && imageState.loading && !imageState.error && (
        <div className="image-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
      
      <img
        key={getImageKey()}
        src={getImageSrc()}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{
          opacity: imageState.loading ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          ...style
        }}
        {...props}
      />
      
      {imageState.error && (
        <div className="image-error-overlay">
          <span className="error-text">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
