// Import necessary modules and types
import multer, { MulterError } from 'multer';
import { Request, Response, NextFunction } from 'express';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Define a custom type for the uploaded file
interface UploadedFile extends Express.Multer.File {}

// Configure multer storage settings
const storage = multer.memoryStorage();

// Configure multer upload settings
const upload = multer({
  storage: storage,
  fileFilter: (
    req: Request,
    file: UploadedFile,
    cb: multer.FileFilterCallback
  ) => {
    // Check if the file is an image
    if (file.mimetype.startsWith('image')) {
      // Allow the upload
      cb(null, true);
    } else {
      // Reject the upload
      cb(null, false);
    }
  },
  // Set file size limit to 2MB
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB file size limit
  },
});

// Middleware function to handle single file upload
const singleUpload = upload.single('file');

// Middleware function to upload a single file to Cloudinary
export const uploadSingleFile = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Handle single file upload
  singleUpload(req, res, (err: any) => {
    // Handle multer errors
    if (err instanceof MulterError) {
      console.error(err);
      // Handle file size limit exceeded error
      if (err.code === 'LIMIT_FILE_SIZE') {
        res.status(500).json({
          success: false,
          msg: 'File size exceeds the limit of 2MB',
        });
      } else {
        // Handle other multer errors
        res.status(500).json({
          success: false,
          msg: err.message,
        });
      }
    } else if (err) {
      // Handle other errors
      console.error(err);
      res.status(500).json({
        success: false,
        error: 'Server error',
      });
    } else {
      // If no errors, proceed to next middleware
      next();
    }
  });
};

// Function to upload a single file to Cloudinary
export const uploadToCloudinary = async (
  req: Request
): Promise<{ success: boolean; msg: string; url?: string }> => {
  try {
    const file = req.file as UploadedFile;
    if (!file) {
      // If no file is uploaded, return error
      return {
        success: false,
        msg: 'No file uploaded',
      };
    }
    // Generate a unique filename
    const uniqueFilename = new Date().toISOString() + '_' + file.originalname;

    // Convert file to base64
    const base64 = file.buffer.toString('base64');
    const dataUri = `data:${file.mimetype};base64,${base64}`;

    // Upload file to Cloudinary
    const result = (await cloudinary.uploader.upload(dataUri, {
      folder: 'ecommerce',
      use_filename: true,
      public_id: uniqueFilename,
      overwrite: false,
      resource_type: 'auto',
    })) as UploadApiResponse;

    // Return success message and uploaded image URL
    return {
      success: true,
      msg: 'Image uploaded successfully',
      url: result.secure_url,
    };
  } catch (error) {
    // Handle errors during upload
    console.error(error);
    console.error('Error in uploading image to cloudinary');
    return {
      success: false,
      msg: error.message,
    };
  }
};
