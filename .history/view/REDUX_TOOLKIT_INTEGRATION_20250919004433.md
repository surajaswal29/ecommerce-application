# Redux Toolkit + Axios Integration

This document explains the Redux Toolkit integration with Axios for global state management in the ecommerce application.

## Overview

The application now uses Redux Toolkit for state management with the following key features:
- **Redux Toolkit** for simplified Redux logic
- **Axios interceptors** for automatic token handling
- **Custom hooks** for easy state access
- **Async thunks** for API calls
- **Normalized state** for better performance

## File Structure

```
src/
├── store/
│   ├── store.js              # Main store configuration
│   └── slices/
│       ├── authSlice.js      # Authentication state management
│       └── dataSlice.js      # API data management
├── hooks/
│   ├── use-auth.js          # Authentication hook
│   └── use-data.js          # Data management hook
├── service/
│   └── axiosInstance.js     # Axios configuration with interceptors
└── components/
    └── Example/
        ├── ReduxExample.jsx  # Complete integration example
        └── LoginExample.jsx  # Login flow example
```

## Key Features

### 1. Axios Instance with Interceptors

**File:** `src/service/axiosInstance.js`

- Automatic token injection in requests
- Global error handling (401 → logout)
- Base URL configuration from environment variables
- Request/response interceptors

```javascript
// Automatic token handling
axiosInstance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.store.dispatch({ type: 'auth/logout' });
      window.location.href = '/user/login';
    }
    return Promise.reject(error);
  }
);
```

### 2. Authentication Slice

**File:** `src/store/slices/authSlice.js`

- User login/logout/registration
- Token management
- Loading and error states
- Async thunks for API calls

```javascript
// Login thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/user/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      if (token) setToken(token);
      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
```

### 3. Data Management Slice

**File:** `src/store/slices/dataSlice.js`

- Products, orders, and cart management
- Normalized state structure
- LocalStorage integration for cart
- Async thunks for all API operations

```javascript
// Add to cart thunk
export const addToCart = createAsyncThunk(
  'data/addToCart',
  async ({ productId, quantity }, { rejectWithValue, getState }) => {
    // Implementation with localStorage sync
  }
);
```

### 4. Custom Hooks

**Files:** `src/hooks/use-auth.js` and `src/hooks/use-data.js`

- Simplified state access
- Pre-computed values
- Action dispatchers
- Type-safe selectors

```javascript
// Usage in components
const { isAuthenticated, user, login, logout, isLoading } = useAuth();
const { products, cartItems, addItemToCart } = useData();
```

## Usage Examples

### 1. Authentication Flow

```javascript
import { useAuth } from '../hooks/use-auth';

const LoginComponent = () => {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  
  const handleLogin = async (credentials) => {
    await login(credentials);
  };
  
  if (isAuthenticated) {
    return <div>Welcome!</div>;
  }
  
  return (
    <form onSubmit={handleLogin}>
      {/* Login form */}
    </form>
  );
};
```

### 2. Data Fetching

```javascript
import { useData } from '../hooks/use-data';

const ProductList = () => {
  const { products, productsLoading, getProducts } = useData();
  
  useEffect(() => {
    getProducts({ category: 'electronics' });
  }, [getProducts]);
  
  if (productsLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {products.map(product => (
        <div key={product._id}>{product.name}</div>
      ))}
    </div>
  );
};
```

### 3. Cart Management

```javascript
import { useData } from '../hooks/use-data';

const CartComponent = () => {
  const { 
    cartItems, 
    cartItemsCount, 
    cartTotal, 
    addItemToCart, 
    removeItemFromCart 
  } = useData();
  
  return (
    <div>
      <h3>Cart ({cartItemsCount} items)</h3>
      <p>Total: ${cartTotal}</p>
      {cartItems.map(item => (
        <div key={item.product}>
          {item.name} - ${item.price} x {item.quantity}
          <button onClick={() => removeItemFromCart(item.product)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};
```

## Environment Configuration

Create a `.env` file in the `view` directory:

```env
VITE_API_BASE_URL=http://localhost:4000
```

For production:
```env
VITE_API_BASE_URL=https://your-production-api.com
```

## Migration from Old Redux

The old Redux setup has been replaced with Redux Toolkit:

### Before (Old Redux)
```javascript
// Old action
export const userLogin = (email, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await axios.post('/api/v1/user/login', { email, password });
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};
```

### After (Redux Toolkit)
```javascript
// New async thunk
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/user/login', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
```

## Best Practices

1. **Use custom hooks** instead of direct useSelector/useDispatch
2. **Keep API logic in thunks**, not in components
3. **Use the axiosInstance** for all API calls
4. **Handle loading and error states** in UI
5. **Normalize state** for better performance
6. **Use localStorage** for persistent data (cart, preferences)

## Testing

The integration includes example components:
- `ReduxExample.jsx` - Complete integration demo
- `LoginExample.jsx` - Authentication flow demo

These components demonstrate proper usage patterns and can be used as reference implementations.

## Troubleshooting

### Common Issues

1. **Token not being sent**: Check if axiosInstance is being used
2. **401 errors not handled**: Verify interceptors are properly configured
3. **State not updating**: Ensure components are wrapped in Provider
4. **Cart not persisting**: Check localStorage permissions

### Debug Tips

1. Use Redux DevTools to inspect state
2. Check network tab for API calls
3. Verify token in localStorage
4. Check console for error messages
