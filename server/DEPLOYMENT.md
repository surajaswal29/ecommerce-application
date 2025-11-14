# Google Cloud Run Deployment Guide

## Prerequisites

1. Google Cloud Platform account
2. Google Cloud SDK installed and configured
3. Docker installed (for local testing)
4. Project ID set in GCP

## Environment Variables

Set the following environment variables in Cloud Run:

### Required Variables

- `PORT` - Automatically set by Cloud Run (default: 8080)
- `NODE_ENV` - Set to `production`
- `DB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRE` - JWT expiration time (e.g., `7d`)
- `COOKIE_EXPIRE` - Cookie expiration in days (e.g., `7`)

### Cloudinary Configuration

- `CLOUDINARY_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### Email Configuration (Optional)

- `SMTP_HOST` - SMTP server host (default: `smtp.gmail.com`)
- `SMTP_PORT` - SMTP server port (default: `587`)
- `SMTP_EMAIL` - SMTP email address
- `SMTP_PASSWORD` - SMTP password

### CORS Configuration

- `FRONTEND_URL` - Frontend URL for CORS (e.g., `https://yourdomain.com`)

## Deployment Methods

### Method 1: Using Google Cloud Build (Recommended)

1. **Enable required APIs:**
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   gcloud services enable run.googleapis.com
   gcloud services enable containerregistry.googleapis.com
   ```

2. **Set your project ID:**
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **Submit build:**
   ```bash
   gcloud builds submit --config cloudbuild.yaml
   ```

### Method 2: Manual Deployment

1. **Build and push Docker image:**
   ```bash
   # Build the image
   docker build -t gcr.io/YOUR_PROJECT_ID/ecommerce-server:latest .

   # Push to Container Registry
   docker push gcr.io/YOUR_PROJECT_ID/ecommerce-server:latest
   ```

2. **Deploy to Cloud Run:**
   ```bash
   gcloud run deploy ecommerce-server \
     --image gcr.io/YOUR_PROJECT_ID/ecommerce-server:latest \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --port 8080 \
     --memory 512Mi \
     --cpu 1 \
     --min-instances 0 \
     --max-instances 10 \
     --timeout 300 \
     --set-env-vars NODE_ENV=production,DB_URI=your_mongodb_uri,JWT_SECRET=your_secret
   ```

### Method 3: Using Cloud Run with Source Code

1. **Deploy directly from source:**
   ```bash
   gcloud run deploy ecommerce-server \
     --source . \
     --region us-central1 \
     --platform managed \
     --allow-unauthenticated \
     --port 8080
   ```

## Setting Environment Variables

### Using gcloud CLI:

```bash
gcloud run services update ecommerce-server \
  --region us-central1 \
  --update-env-vars \
    NODE_ENV=production,\
    DB_URI=your_mongodb_uri,\
    JWT_SECRET=your_secret,\
    CLOUDINARY_NAME=your_cloud_name,\
    CLOUDINARY_API_KEY=your_api_key,\
    CLOUDINARY_API_SECRET=your_api_secret
```

### Using Cloud Console:

1. Go to Cloud Run in Google Cloud Console
2. Select your service
3. Click "Edit & Deploy New Revision"
4. Go to "Variables & Secrets" tab
5. Add environment variables
6. Deploy

## Local Testing

1. **Build the Docker image:**
   ```bash
   docker build -t ecommerce-server .
   ```

2. **Run locally:**
   ```bash
   docker run -p 8080:8080 \
     -e PORT=8080 \
     -e NODE_ENV=production \
     -e DB_URI=your_mongodb_uri \
     -e JWT_SECRET=your_secret \
     ecommerce-server
   ```

## Health Check

The service includes a health check endpoint at `/health`. Cloud Run will automatically use this for health monitoring.

## Monitoring

- View logs: `gcloud run services logs read ecommerce-server --region us-central1`
- View metrics in Cloud Console under Cloud Run > Metrics

## Troubleshooting

1. **Check logs:**
   ```bash
   gcloud run services logs read ecommerce-server --region us-central1 --limit 50
   ```

2. **Verify environment variables:**
   ```bash
   gcloud run services describe ecommerce-server --region us-central1
   ```

3. **Test locally with same environment:**
   ```bash
   docker run --env-file .env ecommerce-server
   ```

## Cost Optimization

- Set `--min-instances 0` to scale to zero when not in use
- Adjust `--memory` and `--cpu` based on your needs
- Use `--max-instances` to limit scaling

## Security

- Use Secret Manager for sensitive environment variables:
  ```bash
  gcloud run services update ecommerce-server \
    --update-secrets JWT_SECRET=jwt-secret:latest,DB_URI=db-uri:latest
  ```

- Enable authentication if needed (remove `--allow-unauthenticated`)

