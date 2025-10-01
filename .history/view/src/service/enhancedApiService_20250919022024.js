/**
 * Enhanced API Service with Snackbar Integration
 * Provides API calls with automatic success/error notifications
 */

import { useApiWithSnackbar } from '../utils/api-with-snackbar';
import {
  cartApi,
  orderApi,
  paymentApi,
  productApi,
  userApi,
} from './apiService';

/**
 * Enhanced User API with Snackbar integration
 */
export const useEnhancedUserApi = () => {
  const enhancedUserApi = useApiWithSnackbar(userApi);

  return {
    ...enhancedUserApi,

    // Override specific methods with custom messages
    register: (userData) =>
      enhancedUserApi.register(userData, {
        successMessage: 'Registration successful! Welcome to our platform.',
        errorMessage: 'Registration failed. Please try again.',
      }),

    login: (credentials) =>
      enhancedUserApi.login(credentials, {
        successMessage: 'Login successful! Welcome back.',
        errorMessage: 'Login failed. Please check your credentials.',
      }),

    logout: () =>
      enhancedUserApi.logout({
        successMessage: 'Logged out successfully.',
        showError: false, // Don't show error for logout
      }),

    updateProfile: (profileData) =>
      enhancedUserApi.updateProfile(profileData, {
        successMessage: 'Profile updated successfully!',
        errorMessage: 'Failed to update profile. Please try again.',
      }),

    updatePassword: (passwordData) =>
      enhancedUserApi.updatePassword(passwordData, {
        successMessage: 'Password updated successfully!',
        errorMessage: 'Failed to update password. Please try again.',
      }),

    forgotPassword: (email) =>
      enhancedUserApi.forgotPassword(email, {
        successMessage: 'Password reset email sent! Check your inbox.',
        errorMessage: 'Failed to send reset email. Please try again.',
      }),

    resetPassword: (token, passwordData) =>
      enhancedUserApi.resetPassword(token, passwordData, {
        successMessage: 'Password reset successfully! You can now login.',
        errorMessage: 'Failed to reset password. Please try again.',
      }),

    uploadImage: (formData) =>
      enhancedUserApi.uploadImage(formData, {
        successMessage: 'Profile image uploaded successfully!',
        errorMessage: 'Failed to upload image. Please try again.',
      }),
  };
};

/**
 * Enhanced Product API with Snackbar integration
 */
export const useEnhancedProductApi = () => {
  const enhancedProductApi = useApiWithSnackbar(productApi);

  return {
    ...enhancedProductApi,

    // Override specific methods with custom messages
    createProduct: (productData) =>
      enhancedProductApi.createProduct(productData, {
        successMessage: 'Product created successfully!',
        errorMessage: 'Failed to create product. Please try again.',
      }),

    updateProduct: (productId, productData) =>
      enhancedProductApi.updateProduct(productId, productData, {
        successMessage: 'Product updated successfully!',
        errorMessage: 'Failed to update product. Please try again.',
      }),

    deleteProduct: (productId) =>
      enhancedProductApi.deleteProduct(productId, {
        successMessage: 'Product deleted successfully!',
        errorMessage: 'Failed to delete product. Please try again.',
      }),
  };
};

/**
 * Enhanced Order API with Snackbar integration
 */
export const useEnhancedOrderApi = () => {
  const enhancedOrderApi = useApiWithSnackbar(orderApi);

  return {
    ...enhancedOrderApi,

    // Override specific methods with custom messages
    createOrder: (orderData) =>
      enhancedOrderApi.createOrder(orderData, {
        successMessage: 'Order placed successfully!',
        errorMessage: 'Failed to place order. Please try again.',
      }),

    updateOrderStatus: (orderId, status) =>
      enhancedOrderApi.updateOrderStatus(orderId, status, {
        successMessage: 'Order status updated successfully!',
        errorMessage: 'Failed to update order status. Please try again.',
      }),
  };
};

/**
 * Enhanced Cart API with Snackbar integration
 */
export const useEnhancedCartApi = () => {
  const enhancedCartApi = useApiWithSnackbar(cartApi);

  return {
    ...enhancedCartApi,

    // Override specific methods with custom messages
    addToCart: (productId, quantity) =>
      enhancedCartApi.addToCart(productId, quantity, {
        successMessage: 'Item added to cart!',
        errorMessage: 'Failed to add item to cart. Please try again.',
      }),

    updateCartItem: (itemId, quantity) =>
      enhancedCartApi.updateCartItem(itemId, quantity, {
        successMessage: 'Cart updated successfully!',
        errorMessage: 'Failed to update cart. Please try again.',
      }),

    removeFromCart: (itemId) =>
      enhancedCartApi.removeFromCart(itemId, {
        successMessage: 'Item removed from cart!',
        errorMessage: 'Failed to remove item from cart. Please try again.',
      }),

    clearCart: () =>
      enhancedCartApi.clearCart({
        successMessage: 'Cart cleared successfully!',
        errorMessage: 'Failed to clear cart. Please try again.',
      }),
  };
};

/**
 * Enhanced Payment API with Snackbar integration
 */
export const useEnhancedPaymentApi = () => {
  const enhancedPaymentApi = useApiWithSnackbar(paymentApi);

  return {
    ...enhancedPaymentApi,

    // Override specific methods with custom messages
    processPayment: (paymentData) =>
      enhancedPaymentApi.processPayment(paymentData, {
        successMessage: 'Payment processed successfully!',
        errorMessage: 'Payment failed. Please try again.',
      }),

    createPaymentIntent: (amount) =>
      enhancedPaymentApi.createPaymentIntent(amount, {
        successMessage: 'Payment intent created successfully!',
        errorMessage: 'Failed to create payment intent. Please try again.',
      }),
  };
};

/**
 * Get all enhanced API services
 */
export const useEnhancedApiServices = () => {
  return {
    user: useEnhancedUserApi(),
    product: useEnhancedProductApi(),
    order: useEnhancedOrderApi(),
    cart: useEnhancedCartApi(),
    payment: useEnhancedPaymentApi(),
  };
};

export default {
  useEnhancedUserApi,
  useEnhancedProductApi,
  useEnhancedOrderApi,
  useEnhancedCartApi,
  useEnhancedPaymentApi,
  useEnhancedApiServices,
};
