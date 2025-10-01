import React, { useState } from 'react';
import ImageUpload from './ImageUpload';

const ImageUploadDemo = () => {
    const [uploadedImages, setUploadedImages] = useState([]);
    const [uploadHistory, setUploadHistory] = useState([]);

    const handleUploadSuccess = (uploadData, files) => {
        console.log('Upload successful:', uploadData);
        console.log('Files:', files);

        // Add to uploaded images
        const newImages = Array.isArray(uploadData) ? uploadData : [uploadData];
        setUploadedImages(prev => [...prev, ...newImages]);

        // Add to upload history
        setUploadHistory(prev => [...prev, {
            timestamp: new Date().toISOString(),
            images: newImages,
            count: newImages.length
        }]);
    };

    const handleUploadError = (error) => {
        console.error('Upload error:', error);
        alert(`Upload failed: ${error.message || 'Unknown error'}`);
    };

    const clearHistory = () => {
        setUploadedImages([]);
        setUploadHistory([]);
    };

    return (
        <div className="image-upload-demo">
            <div className="container">
                <h1>Image Upload Demo</h1>
                <p>Test the improved image upload functionality with Cloudinary integration.</p>

                <div className="demo-section">
                    <h2>Single Image Upload</h2>
                    <ImageUpload
                        onUploadSuccess={handleUploadSuccess}
                        onUploadError={handleUploadError}
                        multiple={false}
                        folder="ecommerce/demo"
                        className="demo-upload"
                    />
                </div>

                <div className="demo-section">
                    <h2>Multiple Images Upload</h2>
                    <ImageUpload
                        onUploadSuccess={handleUploadSuccess}
                        onUploadError={handleUploadError}
                        multiple={true}
                        maxFiles={5}
                        folder="ecommerce/demo"
                        className="demo-upload"
                    />
                </div>

                {/* Uploaded Images Display */}
                {uploadedImages.length > 0 && (
                    <div className="demo-section">
                        <div className="section-header">
                            <h2>Uploaded Images ({uploadedImages.length})</h2>
                            <button
                                className="clear-history-btn"
                                onClick={clearHistory}
                            >
                                Clear History
                            </button>
                        </div>

                        <div className="uploaded-images-grid">
                            {uploadedImages.map((image, index) => (
                                <div key={image.public_id || index} className="uploaded-image-item">
                                    <img
                                        src={image.secure_url}
                                        alt={`Uploaded ${index + 1}`}
                                        className="uploaded-image"
                                    />
                                    <div className="image-info">
                                        <p><strong>Public ID:</strong> {image.public_id}</p>
                                        <p><strong>Format:</strong> {image.format}</p>
                                        <p><strong>Size:</strong> {image.width}x{image.height}</p>
                                        <p><strong>Bytes:</strong> {image.bytes}</p>
                                        <a
                                            href={image.secure_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="view-link"
                                        >
                                            View Full Size
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload History */}
                {uploadHistory.length > 0 && (
                    <div className="demo-section">
                        <h2>Upload History</h2>
                        <div className="upload-history">
                            {uploadHistory.map((entry, index) => (
                                <div key={index} className="history-item">
                                    <div className="history-header">
                                        <span className="history-time">
                                            {new Date(entry.timestamp).toLocaleString()}
                                        </span>
                                        <span className="history-count">
                                            {entry.count} image{entry.count > 1 ? 's' : ''} uploaded
                                        </span>
                                    </div>
                                    <div className="history-images">
                                        {entry.images.map((image, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                src={image.secure_url}
                                                alt={`History ${index}-${imgIndex}`}
                                                className="history-thumbnail"
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* API Endpoints Info */}
                <div className="demo-section">
                    <h2>API Endpoints</h2>
                    <div className="api-info">
                        <div className="endpoint">
                            <h3>Single Image Upload</h3>
                            <code>POST /api/v1/upload/single</code>
                            <p>Upload a single image file</p>
                        </div>
                        <div className="endpoint">
                            <h3>Multiple Images Upload</h3>
                            <code>POST /api/v1/upload/multiple</code>
                            <p>Upload multiple image files (max 5)</p>
                        </div>
                        <div className="endpoint">
                            <h3>Delete Image</h3>
                            <code>DELETE /api/v1/upload/:publicId</code>
                            <p>Delete an image by public ID</p>
                        </div>
                        <div className="endpoint">
                            <h3>Upload Stats</h3>
                            <code>GET /api/v1/upload/stats</code>
                            <p>Get upload configuration and limits</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageUploadDemo;
