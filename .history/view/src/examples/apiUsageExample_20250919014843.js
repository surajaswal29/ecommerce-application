/**
 * API Usage Examples
 * Demonstrates how to use the new API constants and services in the frontend
 */

import { API_ENDPOINTS, getFullUrl, getCompleteUrl } from '../constants/apiEndpoints';
import { apiService } from '../service/apiService';
import { authApi } from '../service/authService';

// Example 1: Using API constants directly
console.log('=== API Constants Usage ===');
console.log('Login endpoint:', API_ENDPOINTS.USER.LOGIN.path);
console.log('Product details endpoint:', API_ENDPOINTS.PRODUCT.GET_PRODUCT_DETAILS.path);

// Example 2: Building URLs with parameters
console.log('\n=== URL Building Examples ===');
const loginUrl = getFullUrl(API_ENDPOINTS.USER.LOGIN.path);
console.log('Login URL:', loginUrl);

const productUrl = getCompleteUrl('PRODUCT', 'GET_PRODUCT_DETAILS', { id: '123' });
console.log('Product URL with ID:', productUrl);

const productsWithFilters = getCompleteUrl('PRODUCT', 'GET_ALL_PRODUCTS', {}, { 
  page: 1, 
  category: 'electronics',
  price: '100-500'
});
console.log('Products with filters:', productsWithFilters);

// Example 3: Using the centralized API service
console.log('\n=== API Service Usage ===');

// User authentication
const userExamples = {
  async login() {
    try {
      const result = await authApi.login({ 
        email: 'user@example.com', 
        password: 'password123' 
      });
      console.log('Login successful:', result);
      return result;
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  },

  async register() {
    try {
      const result = await authApi.register({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      });
      console.log('Registration successful:', result);
      return result;
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  },

  async getProfile() {
    try {
      const result = await authApi.getMyDetails();
      console.log('User profile:', result);
      return result;
    } catch (error) {
      console.error('Failed to get profile:', error.message);
    }
  }
};

// Product operations
const productExamples = {
  async getProducts() {
    try {
      const result = await apiService.product.getAllProducts({
        page: 1,
        category: 'electronics',
        price: [100, 500]
      });
      console.log('Products:', result);
      return result;
    } catch (error) {
      console.error('Failed to get products:', error.message);
    }
  },

  async getProductDetails(productId) {
    try {
      const result = await apiService.product.getProductDetails(productId);
      console.log('Product details:', result);
      return result;
    } catch (error) {
      console.error('Failed to get product details:', error.message);
    }
  },

  async createReview(productId, reviewData) {
    try {
      const result = await apiService.product.createProductReview({
        productId,
        rating: 5,
        comment: 'Great product!'
      });
      console.log('Review created:', result);
      return result;
    } catch (error) {
      console.error('Failed to create review:', error.message);
    }
  }
};

// Cart operations
const cartExamples = {
  async addToCart(productId, quantity) {
    try {
      const result = await apiService.cart.addToCart({
        productId,
        quantity
      });
      console.log('Added to cart:', result);
      return result;
    } catch (error) {
      console.error('Failed to add to cart:', error.message);
    }
  },

  async getCart() {
    try {
      const result = await apiService.cart.getMyCart();
      console.log('Cart items:', result);
      return result;
    } catch (error) {
      console.error('Failed to get cart:', error.message);
    }
  },

  async updateCartItem(productId, quantity) {
    try {
      const result = await apiService.cart.updateCartItem({
        productId,
        quantity
      });
      console.log('Cart updated:', result);
      return result;
    } catch (error) {
      console.error('Failed to update cart:', error.message);
    }
  },

  async removeFromCart(productId) {
    try {
      const result = await apiService.cart.deleteCartItem(productId);
      console.log('Removed from cart:', result);
      return result;
    } catch (error) {
      console.error('Failed to remove from cart:', error.message);
    }
  }
};

// Order operations
const orderExamples = {
  async createOrder(orderData) {
    try {
      const result = await apiService.order.createOrder({
        shippingInfo: {
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          country: 'USA',
          pinCode: '10001',
          phoneNo: '1234567890'
        },
        orderItems: [
          {
            product: 'productId',
            name: 'Product Name',
            price: 100,
            quantity: 2
          }
        ]
      });
      console.log('Order created:', result);
      return result;
    } catch (error) {
      console.error('Failed to create order:', error.message);
    }
  },

  async getMyOrders() {
    try {
      const result = await apiService.order.getMyOrders();
      console.log('My orders:', result);
      return result;
    } catch (error) {
      console.error('Failed to get orders:', error.message);
    }
  },

  async getOrderDetails(orderId) {
    try {
      const result = await apiService.order.getOrderDetails(orderId);
      console.log('Order details:', result);
      return result;
    } catch (error) {
      console.error('Failed to get order details:', error.message);
    }
  }
};

// Payment operations
const paymentExamples = {
  async createPayment(paymentData) {
    try {
      const result = await apiService.payment.createPayment({
        amount: 1000,
        currency: 'INR',
        orderId: 'order123'
      });
      console.log('Payment created:', result);
      return result;
    } catch (error) {
      console.error('Failed to create payment:', error.message);
    }
  },

  async getPaymentStatus(paymentRequestId) {
    try {
      const result = await apiService.payment.getPaymentStatus(paymentRequestId);
      console.log('Payment status:', result);
      return result;
    } catch (error) {
      console.error('Failed to get payment status:', error.message);
    }
  }
};

// Upload operations
const uploadExamples = {
  async uploadSingleImage(file) {
    try {
      const result = await apiService.upload.uploadSingle(file);
      console.log('Image uploaded:', result);
      return result;
    } catch (error) {
      console.error('Failed to upload image:', error.message);
    }
  },

  async uploadMultipleImages(files) {
    try {
      const result = await apiService.upload.uploadMultiple(files);
      console.log('Images uploaded:', result);
      return result;
    } catch (error) {
      console.error('Failed to upload images:', error.message);
    }
  },

  async deleteImage(publicId) {
    try {
      const result = await apiService.upload.deleteImage(publicId);
      console.log('Image deleted:', result);
      return result;
    } catch (error) {
      console.error('Failed to delete image:', error.message);
    }
  }
};

// Example 4: React component usage
const ReactComponentExample = `
// In a React component
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductDetails } from '../store/slices/dataSlice';
import { apiService } from '../service/apiService';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.data.products);

  useEffect(() => {
    // Using Redux thunks (recommended)
    dispatch(fetchProducts({ category: 'electronics' }));
    
    // Or using API service directly
    const loadProducts = async () => {
      try {
        const data = await apiService.product.getAllProducts({ 
          category: 'electronics' 
        });
        console.log('Products loaded:', data);
      } catch (error) {
        console.error('Failed to load products:', error);
      }
    };
    
    loadProducts();
  }, [dispatch]);

  const handleProductClick = async (productId) => {
    try {
      const product = await apiService.product.getProductDetails(productId);
      console.log('Product details:', product);
    } catch (error) {
      console.error('Failed to get product details:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {products.map(product => (
        <div key={product._id} onClick={() => handleProductClick(product._id)}>
          {product.name}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
`;

// Example 5: Error handling patterns
const errorHandlingExamples = {
  async handleApiCall() {
    try {
      const result = await apiService.product.getAllProducts();
      return { success: true, data: result };
    } catch (error) {
      // Handle different error types
      if (error.response?.status === 401) {
        // Unauthorized - redirect to login
        console.log('User not authenticated, redirecting to login');
        return { success: false, error: 'Authentication required' };
      } else if (error.response?.status === 403) {
        // Forbidden - insufficient permissions
        console.log('Insufficient permissions');
        return { success: false, error: 'Access denied' };
      } else if (error.response?.status >= 500) {
        // Server error
        console.log('Server error occurred');
        return { success: false, error: 'Server error, please try again later' };
      } else {
        // Other errors
        const message = error.response?.data?.message || error.message || 'An error occurred';
        console.log('API error:', message);
        return { success: false, error: message };
      }
    }
  }
};

// Export examples for use in other files
export {
  userExamples,
  productExamples,
  cartExamples,
  orderExamples,
  paymentExamples,
  uploadExamples,
  errorHandlingExamples,
  ReactComponentExample
};

// Example 6: Environment-specific configuration
const getApiConfig = () => {
  const isDevelopment = import.meta.env.DEV;
  const isLocalhost = window.location.hostname === 'localhost';
  
  return {
    baseUrl: isDevelopment && isLocalhost 
      ? 'http://localhost:4000' 
      : 'https://ecommerce-app-i3h2.onrender.com',
    timeout: 10000,
    retryAttempts: 3
  };
};

console.log('API Configuration:', getApiConfig());
