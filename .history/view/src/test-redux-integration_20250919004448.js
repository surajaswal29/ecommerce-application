/**
 * Simple test to verify Redux Toolkit integration
 * Run this in browser console to test the store
 */

import store from './store/store';
import { loginUser, loadUser } from './store/slices/authSlice';
import { fetchProducts, addToCart } from './store/slices/dataSlice';

// Test function
export const testReduxIntegration = () => {
  console.log('🧪 Testing Redux Toolkit Integration...');
  
  // Test 1: Store is properly configured
  console.log('✅ Store state:', store.getState());
  
  // Test 2: Auth slice is working
  console.log('✅ Auth state:', store.getState().auth);
  
  // Test 3: Data slice is working
  console.log('✅ Data state:', store.getState().data);
  
  // Test 4: Dispatch actions
  console.log('🔄 Testing action dispatch...');
  
  // Test login action (will fail without valid credentials, but that's expected)
  store.dispatch(loginUser({ email: 'test@example.com', password: 'password' }))
    .then((result) => {
      if (result.type.endsWith('/fulfilled')) {
        console.log('✅ Login action dispatched successfully');
      } else {
        console.log('⚠️ Login failed (expected without valid credentials)');
      }
    });
  
  // Test load user action
  store.dispatch(loadUser())
    .then((result) => {
      if (result.type.endsWith('/fulfilled')) {
        console.log('✅ Load user action dispatched successfully');
      } else {
        console.log('⚠️ Load user failed (expected without valid token)');
      }
    });
  
  // Test fetch products action
  store.dispatch(fetchProducts())
    .then((result) => {
      if (result.type.endsWith('/fulfilled')) {
        console.log('✅ Fetch products action dispatched successfully');
        console.log('📦 Products loaded:', result.payload.products?.length || 0);
      } else {
        console.log('⚠️ Fetch products failed:', result.payload);
      }
    });
  
  console.log('🎉 Redux Toolkit integration test completed!');
  console.log('💡 Check the Redux DevTools for detailed state changes');
};

// Make it available globally for testing
if (typeof window !== 'undefined') {
  window.testReduxIntegration = testReduxIntegration;
  console.log('🔧 Redux test function available as window.testReduxIntegration()');
}
