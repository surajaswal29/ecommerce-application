# Environment Variables Configuration

Create a `.env` file in the server directory with the following variables:

```env
# Database Configuration
DB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Server Configuration
NODE_ENV=development
PORT=4000

# Email Configuration (if using email features)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Cloudinary Configuration (if using image upload)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

## Important Notes:

1. **JWT_SECRET**: Use a strong, random secret key (at least 32 characters)
2. **JWT_EXPIRE**: Token expiration time (e.g., "7d", "24h", "1h")
3. **DB_URI**: Your MongoDB connection string
4. **NODE_ENV**: Set to "production" for production deployment
