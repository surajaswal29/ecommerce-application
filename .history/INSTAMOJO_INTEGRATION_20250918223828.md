# Instamojo Seamless Checkout Integration

This document provides complete setup instructions for integrating Instamojo
Seamless Checkout into your ecommerce application.

## 🚀 Features Implemented

### Backend (Node.js + Express)

- ✅ `POST /api/v1/payment/create-payment` - Creates Instamojo payment requests
- ✅ `POST /api/v1/payment/webhook` - Handles payment notifications
- ✅ `GET /api/v1/payment/payment-status/:id` - Gets payment status
- ✅ Secure API key and auth token handling
- ✅ Comprehensive error handling and validation

### Frontend (React)

- ✅ `PaymentButton` component with Instamojo integration
- ✅ Automatic script loading and configuration
- ✅ Payment success/failure handling
- ✅ Payment success page with order details
- ✅ Updated order flow integration

## 📋 Prerequisites

1. **Instamojo Account**: Sign up at [Instamojo](https://www.instamojo.com/)
2. **API Credentials**: Get your API Key and Auth Token from Instamojo dashboard
3. **Node.js**: Version 14 or higher
4. **MongoDB**: For order storage

## 🔧 Setup Instructions

### 1. Environment Configuration

Create a `.env` file in your `server` directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d

# Cloudinary
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Instamojo Payment Gateway
INSTAMOJO_API_KEY=your_instamojo_api_key
INSTAMOJO_AUTH_TOKEN=your_instamojo_auth_token
INSTAMOJO_BASE_URL=https://test.instamojo.com

# Server URLs (for webhooks and redirects)
BACKEND_URL=http://localhost:4000
FRONTEND_URL=http://localhost:3000

# Server
PORT=4000
NODE_ENV=development
```

### 2. Install Dependencies

#### Backend Dependencies

```bash
cd server
npm install axios
```

#### Frontend Dependencies

All required dependencies are already included in your existing setup.

### 3. Get Instamojo Credentials

1. **Login to Instamojo Dashboard**
2. **Go to API Keys section**
3. **Copy your API Key and Auth Token**
4. **Update your `.env` file with these credentials**

### 4. Configure Webhook URL

In your Instamojo dashboard:

1. **Go to Settings → Webhooks**
2. **Add webhook URL**: `http://your-domain.com/api/v1/payment/webhook`
3. **For development**: Use ngrok or similar tool to expose local server

### 5. Test Configuration

#### Backend Testing

```bash
cd server
npm run dev
```

Test the payment creation endpoint:

```bash
curl -X POST http://localhost:4000/api/v1/payment/create-payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "amount": 100,
    "purpose": "Test Payment",
    "buyer_name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }'
```

#### Frontend Testing

```bash
cd view
npm run dev
```

Navigate to: `http://localhost:3000/order/confirm`

## 🔄 Payment Flow

1. **User adds items to cart**
2. **Proceeds to shipping details**
3. **Confirms order details**
4. **Clicks "Pay with Instamojo"**
5. **Instamojo payment modal opens**
6. **User completes payment**
7. **Redirected to success page**
8. **Order created in database**

## 📁 File Structure

```
ecommerce-application-legacy/
├── server/
│   ├── controllers/
│   │   └── paymentController.js          # Payment API endpoints
│   ├── routes/
│   │   └── paymentRoute.js              # Payment routes
│   ├── models/
│   │   └── orderModels.js               # Updated order model
│   └── package.json                     # Added axios dependency
├── view/
│   └── src/
│       └── components/
│           └── layout/
│               └── cart/
│                   ├── PaymentButton.jsx    # Instamojo payment component
│                   ├── PaymentSuccess.jsx   # Payment success page
│                   └── ConfirmOrder.jsx     # Updated with payment integration
└── INSTAMOJO_INTEGRATION.md             # This documentation
```

## 🔒 Security Features

- ✅ **API credentials stored in environment variables**
- ✅ **No sensitive data exposed to frontend**
- ✅ **JWT authentication required for payment creation**
- ✅ **Webhook validation (MAC signature verification available)**
- ✅ **Input validation and sanitization**

## 🛠️ API Endpoints

### Create Payment Request

```http
POST /api/v1/payment/create-payment
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "amount": 100,
  "purpose": "Order #123",
  "buyer_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "order_id": "ORDER_123",
  "redirect_url": "http://localhost:3000/payment-success",
  "webhook_url": "http://localhost:4000/api/v1/payment/webhook"
}
```

### Payment Webhook

```http
POST /api/v1/payment/webhook
Content-Type: application/json

{
  "payment_id": "MOJO1234567890",
  "payment_request_id": "REQ1234567890",
  "payment_status": "Credit",
  "amount": "100.00",
  "buyer_name": "John Doe",
  "buyer_email": "john@example.com",
  "buyer_phone": "9876543210"
}
```

### Get Payment Status

```http
GET /api/v1/payment/payment-status/:payment_request_id
Authorization: Bearer <jwt_token>
```

## 🎨 Frontend Components

### PaymentButton Component

```jsx
<PaymentButton
  orderData={orderData}
  onPaymentStart={() => console.log("Payment started")}
  onPaymentComplete={(payment) => console.log("Payment completed", payment)}
  onPaymentError={(error) => console.error("Payment failed", error)}
/>
```

### Props

- `orderData`: Order information object
- `onPaymentStart`: Callback when payment process starts
- `onPaymentComplete`: Callback when payment succeeds
- `onPaymentError`: Callback when payment fails

## 🚨 Troubleshooting

### Common Issues

1. **"Payment gateway is still loading"**

   - Check if Instamojo script is loading properly
   - Verify internet connection
   - Check browser console for errors

2. **"Failed to create payment request"**

   - Verify API credentials in `.env` file
   - Check if backend server is running
   - Verify JWT token is valid

3. **Webhook not receiving notifications**

   - Ensure webhook URL is accessible from internet
   - Use ngrok for local development
   - Check webhook URL in Instamojo dashboard

4. **Payment modal not opening**
   - Check browser console for JavaScript errors
   - Verify Instamojo script is loaded
   - Check if popup blockers are enabled

### Debug Mode

Enable debug logging by adding to your `.env`:

```env
DEBUG=instamojo:*
```

## 📞 Support

For issues related to:

- **Instamojo API**: Contact Instamojo support
- **Integration**: Check this documentation
- **Code Issues**: Review error logs and console output

## 🔄 Production Deployment

1. **Update environment variables** with production values
2. **Change INSTAMOJO_BASE_URL** to production URL
3. **Update webhook URLs** to production domains
4. **Enable MAC signature verification** for webhooks
5. **Test thoroughly** in staging environment

## 📝 Additional Notes

- The integration supports both test and production environments
- Webhook handling includes basic validation (MAC signature verification can be
  enabled)
- Order creation happens after successful payment
- Error handling covers network issues, API failures, and user cancellations
- The payment button shows loading states and handles disabled states
  appropriately

---

**Happy Coding! 🎉**
