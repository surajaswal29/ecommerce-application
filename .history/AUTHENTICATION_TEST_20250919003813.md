# Authentication System Test Guide

This guide helps you test the new localStorage-based JWT authentication system.

## Prerequisites

1. Ensure your server is running with the updated authentication middleware
2. Make sure you have a `.env` file with proper JWT configuration
3. Have a test user account ready

## Test Steps

### 1. Backend API Testing

#### Test Login Endpoint

```bash
curl -X POST http://localhost:4000/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Expected Response:**

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Test Protected Endpoint

```bash
curl -X GET http://localhost:4000/api/v1/user/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

**Expected Response:**

```json
{
  "success": true,
  "user": {
    "_id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

### 2. Frontend Testing

#### Test 1: Login Flow

1. Navigate to `/user/login`
2. Enter valid credentials
3. Check browser DevTools > Application > Local Storage
4. Verify `authToken` is stored
5. Verify redirect to user account page

#### Test 2: Protected Route Access

1. Try to access `/user/account` without login
2. Should redirect to login page
3. Login and try again
4. Should access the page successfully

#### Test 3: Logout Flow

1. While logged in, click logout
2. Check localStorage - `authToken` should be removed
3. Should redirect to login page
4. Try accessing protected route - should redirect to login

#### Test 4: Token Expiration

1. Login successfully
2. Manually modify the token in localStorage to make it invalid
3. Try to access a protected route
4. Should redirect to login and clear invalid token

### 3. Browser Console Testing

Open browser console and test the authService functions:

```javascript
// Check if token exists
console.log("Token exists:", !!localStorage.getItem("authToken"))

// Check token validity (if you have the authService imported)
// This would be available in components that import authService
```

### 4. Network Tab Verification

1. Open DevTools > Network tab
2. Login and make API requests
3. Verify that requests include `Authorization: Bearer <token>` header
4. Check that 401 responses clear the token

## Expected Behavior

### ✅ Success Cases

- Login saves token to localStorage
- API requests include Authorization header
- Protected routes work with valid token
- Logout clears token and redirects
- Invalid/expired tokens are handled gracefully

### ❌ Error Cases

- Invalid credentials show error message
- Missing token returns 401
- Expired token redirects to login
- Network errors are handled gracefully

## Debugging Tips

### Check localStorage

```javascript
// In browser console
console.log("Stored token:", localStorage.getItem("authToken"))
console.log("Token exists:", !!localStorage.getItem("authToken"))
```

### Check Token Content

```javascript
// Decode JWT token (client-side, for debugging only)
const token = localStorage.getItem("authToken")
if (token) {
  const payload = JSON.parse(atob(token.split(".")[1]))
  console.log("Token payload:", payload)
  console.log("Expires at:", new Date(payload.exp * 1000))
}
```

### Check Network Requests

1. Open DevTools > Network
2. Look for API requests to `/api/v1/user/*`
3. Check Request Headers for `Authorization: Bearer <token>`
4. Check Response status codes

## Common Issues and Solutions

### Issue: Token not being sent

**Solution**: Check if axios interceptor is working or manually add headers

### Issue: 401 Unauthorized

**Solution**:

1. Check if token exists in localStorage
2. Check if token is expired
3. Verify JWT_SECRET matches between frontend and backend

### Issue: Redirect loops

**Solution**:

1. Check ProtectedRoute logic
2. Verify useAuth hook initialization
3. Check for token validation errors

### Issue: localStorage not available

**Solution**:

1. Check if running in secure context (HTTPS)
2. Check browser localStorage settings
3. Add error handling for localStorage access

## Performance Testing

### Token Validation Performance

- Test with large user objects
- Test with multiple concurrent requests
- Monitor memory usage with token operations

### Network Performance

- Test with slow network connections
- Test with network interruptions
- Verify timeout handling

## Security Testing

### XSS Protection

- Test with malicious scripts
- Verify token is not exposed in console logs
- Check for token leakage in error messages

### Token Security

- Verify tokens are not logged in server logs
- Check token expiration handling
- Test with malformed tokens

## Production Readiness Checklist

- [ ] JWT_SECRET is strong and secure
- [ ] Token expiration is appropriate
- [ ] Error handling is comprehensive
- [ ] Logging is appropriate (no sensitive data)
- [ ] CORS is configured correctly
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] Security headers are configured
