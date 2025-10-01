# Authentication Refactor: Cookie to localStorage + JWT

This document outlines the changes made to refactor the authentication system from cookie-based to localStorage-based JWT authentication.

## Overview

The authentication system has been updated to use localStorage for storing JWT tokens instead of HTTP-only cookies. This provides better control over token management and is suitable for single-page applications.

## Backend Changes

### 1. JWT Token Utility (`server/utils/jwtToken.js`)
- **Before**: Set token in HTTP-only cookie
- **After**: Return token in JSON response body
- **Impact**: Frontend now receives token directly in API response

### 2. Authentication Middleware (`server/middleware/auth.js`)
- **Before**: Extracted token from `req.cookies.token`
- **After**: Extracts token from `Authorization: Bearer <token>` header
- **Impact**: All API requests must include Authorization header

### 3. User Controller (`server/controllers/userController.js`)
- **Before**: Logout cleared cookie
- **After**: Logout returns success message (token removal handled by frontend)

## Frontend Changes

### 1. Authentication Service (`view/src/service/authService.js`)
New utility service for localStorage token management:
- `getToken()` - Retrieve token from localStorage
- `setToken(token)` - Save token to localStorage
- `removeToken()` - Clear token from localStorage
- `isTokenValid()` - Check if token exists and is not expired
- `decodeToken(token)` - Decode JWT payload (client-side)
- `isTokenExpired(token)` - Check token expiration

### 2. useAuth Hook (`view/src/hooks/use-auth.js`)
Custom React hook for authentication state management:
- Provides user state, authentication status, and utility functions
- Handles token validation and automatic user loading
- Includes role-based access control helpers
- Manages logout functionality

### 3. User Actions (`view/src/actions/userAction.jsx`)
Updated Redux actions to handle localStorage:
- **Login/Register**: Save token to localStorage on success
- **Load User**: Include Authorization header in requests
- **Update User**: Include Authorization header in requests
- **Logout**: Remove token from localStorage

### 4. API Client (`view/src/service/apiClient.js`)
Axios instance with automatic token handling:
- Automatically adds Authorization header to all requests
- Handles token expiration (401 responses)
- Redirects to login on authentication failure

### 5. Protected Route Component (`view/src/components/Route/ProtectedRoute.jsx`)
Enhanced route protection:
- Uses useAuth hook for authentication checking
- Supports role-based access control
- Shows loading state during authentication check

## Environment Configuration

### Required Environment Variables
Create a `.env` file in the server directory with:

```env
# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Database Configuration
DB_URI=your_mongodb_connection_string

# Server Configuration
NODE_ENV=development
PORT=4000
```

## Usage Examples

### 1. Using the useAuth Hook
```jsx
import { useAuth } from '../hooks/use-auth';

const MyComponent = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      {isAdmin() && <p>Admin privileges</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### 2. Protected Routes
```jsx
import ProtectedRoute from './components/Route/ProtectedRoute';

// Basic protection
<ProtectedRoute>
  <UserProfile />
</ProtectedRoute>

// Role-based protection
<ProtectedRoute requiredRole="admin">
  <AdminPanel />
</ProtectedRoute>
```

### 3. API Requests
```jsx
import apiClient from '../service/apiClient';

// Automatic token handling
const fetchUserData = async () => {
  try {
    const response = await apiClient.get('/api/v1/user/me');
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
  }
};
```

## Security Considerations

### Advantages of localStorage Approach
1. **Client-side control**: Frontend can manage token lifecycle
2. **Stateless**: No server-side session management needed
3. **Flexible**: Easy to implement token refresh logic
4. **SPA-friendly**: Works well with single-page applications

### Security Considerations
1. **XSS Vulnerability**: localStorage is accessible to JavaScript
2. **No HttpOnly Protection**: Tokens can be accessed by malicious scripts
3. **Token Storage**: Consider using secure storage for sensitive applications

### Recommendations for Production
1. **Use HttpOnly Cookies**: For better security in production
2. **Implement CSRF Protection**: When using cookies
3. **Token Refresh**: Implement automatic token refresh
4. **Content Security Policy**: Implement CSP headers
5. **Regular Security Audits**: Monitor for vulnerabilities

## Migration Checklist

- [x] Update backend JWT utility
- [x] Update authentication middleware
- [x] Update user controller
- [x] Create authService utility
- [x] Create useAuth hook
- [x] Update user actions
- [x] Create API client with interceptors
- [x] Update ProtectedRoute component
- [x] Create example components
- [x] Update environment configuration
- [x] Test authentication flow
- [x] Test protected routes
- [x] Test logout functionality

## Testing the Implementation

1. **Login Flow**:
   - Login with valid credentials
   - Verify token is saved to localStorage
   - Verify user data is loaded

2. **Protected Routes**:
   - Access protected route without login (should redirect)
   - Access protected route with valid token (should work)
   - Access admin route with user role (should redirect)

3. **Logout Flow**:
   - Logout should clear localStorage
   - Logout should clear user state
   - Logout should redirect to login

4. **Token Expiration**:
   - Test with expired token
   - Verify automatic redirect to login
   - Verify token is removed from localStorage

## Troubleshooting

### Common Issues
1. **Token not being sent**: Check if Authorization header is included
2. **401 errors**: Verify token is valid and not expired
3. **Redirect loops**: Check ProtectedRoute logic
4. **localStorage errors**: Check if localStorage is available

### Debug Tips
1. Check browser DevTools > Application > Local Storage
2. Monitor Network tab for Authorization headers
3. Check console for authentication errors
4. Verify JWT token format and expiration
