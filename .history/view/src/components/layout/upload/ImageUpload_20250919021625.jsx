import React, { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useSnackbar } from '../../../hooks/use-snackbar';
import './ImageUpload.css';

const ImageUpload = ({
    onUploadSuccess,
    onUploadError,
    multiple = false,
    maxFiles = 5,
    folder = "ecommerce",
    className = ""
}) => {
    const { success: showSuccess, error: showError } = useSnackbar();
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const fileInputRef = useRef(null);

    // Handle file selection
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        setError(null);
        setSuccess(null);

        // Handle rejected files
        if (rejectedFiles.length > 0) {
            const rejectionReasons = rejectedFiles.map(file =>
                `${file.file.name}: ${file.errors.map(e => e.message).join(', ')}`
            );
            setError(`File rejected: ${rejectionReasons.join('; ')}`);
            return;
        }

        // Validate file count
        const totalFiles = multiple ? files.length + acceptedFiles.length : acceptedFiles.length;
        if (totalFiles > maxFiles) {
            setError(`Maximum ${maxFiles} files allowed`);
            return;
        }

        // Process accepted files
        const newFiles = acceptedFiles.map(file => ({
            file,
            id: Math.random().toString(36).substr(2, 9),
            preview: URL.createObjectURL(file),
            uploading: false,
            uploaded: false,
            error: null
        }));

        if (multiple) {
            setFiles(prev => [...prev, ...newFiles]);
        } else {
            setFiles(newFiles);
        }
    }, [files, multiple, maxFiles]);

    // Configure dropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        multiple: multiple
    });

    // Upload files to server
    const uploadFiles = async () => {
        if (files.length === 0) {
            setError('Please select at least one file to upload');
            return;
        }

        setUploading(true);
        setUploadProgress(0);
        setError(null);
        setSuccess(null);

        try {
            const formData = new FormData();
            formData.append('folder', folder);

            files.forEach((fileObj, index) => {
                if (multiple) {
                    formData.append('files', fileObj.file);
                } else {
                    formData.append('file', fileObj.file);
                }
            });

            const endpoint = multiple ? '/api/v1/upload/multiple' : '/api/v1/upload/single';

            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                },
            });

            if (response.data.success) {
                const successMessage = response.data.message || 'Upload successful!';
                setSuccess(successMessage);
                showSuccess(successMessage);

                // Update file objects with upload success
                const updatedFiles = files.map((fileObj, index) => ({
                    ...fileObj,
                    uploading: false,
                    uploaded: true,
                    uploadData: multiple ? response.data.data[index] : response.data.data
                }));

                setFiles(updatedFiles);

                // Call success callback
                if (onUploadSuccess) {
                    onUploadSuccess(response.data.data, updatedFiles);
                }
            } else {
                throw new Error(response.data.message || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Upload failed';
            setError(errorMessage);
            showError(errorMessage);

            // Update file objects with upload error
            const updatedFiles = files.map(fileObj => ({
                ...fileObj,
                uploading: false,
                uploaded: false,
                error: errorMessage
            }));
            setFiles(updatedFiles);

            if (onUploadError) {
                onUploadError(error);
            }
        } finally {
            setUploading(false);
        }
    };

    // Remove file from list
    const removeFile = (fileId) => {
        setFiles(prev => prev.filter(file => file.id !== fileId));
    };

    // Clear all files
    const clearFiles = () => {
        files.forEach(file => {
            if (file.preview) {
                URL.revokeObjectURL(file.preview);
            }
        });
        setFiles([]);
        setError(null);
        setSuccess(null);
    };

    // Trigger file input
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`image-upload-container ${className}`}>
            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
            >
                <input {...getInputProps()} ref={fileInputRef} />
                <div className="dropzone-content">
                    {isDragActive ? (
                        <p>Drop the files here...</p>
                    ) : (
                        <div>
                            <div className="upload-icon">📁</div>
                            <p>Drag & drop images here, or click to select</p>
                            <p className="upload-hint">
                                Supports: JPEG, PNG, GIF, WebP (max 5MB each)
                            </p>
                            {multiple && (
                                <p className="upload-hint">Maximum {maxFiles} files</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Progress */}
            {uploading && (
                <div className="upload-progress">
                    <div className="progress-bar">
                        <div
                            className="progress-fill"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                    <p>Uploading... {uploadProgress}%</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    {error}
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="success-message">
                    <span className="success-icon">✅</span>
                    {success}
                </div>
            )}

            {/* File Preview */}
            {files.length > 0 && (
                <div className="file-preview-container">
                    <div className="file-preview-header">
                        <h4>Selected Files ({files.length})</h4>
                        <button
                            type="button"
                            className="clear-btn"
                            onClick={clearFiles}
                            disabled={uploading}
                        >
                            Clear All
                        </button>
                    </div>

                    <div className="file-preview-grid">
                        {files.map((fileObj) => (
                            <div key={fileObj.id} className="file-preview-item">
                                <div className="file-preview-image">
                                    <img src={fileObj.preview} alt={fileObj.file.name} />
                                    <div className="file-overlay">
                                        {fileObj.uploaded && (
                                            <span className="upload-success">✓</span>
                                        )}
                                        {fileObj.error && (
                                            <span className="upload-error">✗</span>
                                        )}
                                        <button
                                            type="button"
                                            className="remove-file-btn"
                                            onClick={() => removeFile(fileObj.id)}
                                            disabled={uploading}
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                                <div className="file-info">
                                    <p className="file-name" title={fileObj.file.name}>
                                        {fileObj.file.name}
                                    </p>
                                    <p className="file-size">
                                        {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    {fileObj.uploaded && fileObj.uploadData && (
                                        <p className="file-url">
                                            <a
                                                href={fileObj.uploadData.secure_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Image
                                            </a>
                                        </p>
                                    )}
                                    {fileObj.error && (
                                        <p className="file-error">{fileObj.error}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Button */}
            {files.length > 0 && !uploading && (
                <div className="upload-actions">
                    <button
                        type="button"
                        className="upload-btn"
                        onClick={uploadFiles}
                    >
                        Upload {files.length} file{files.length > 1 ? 's' : ''}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
