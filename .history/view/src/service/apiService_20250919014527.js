/**
 * Centralized API Service
 * Uses API endpoints constants for all API calls
 */

import axiosInstance from './axiosInstance';
import { 
  API_ENDPOINTS, 
  getCompleteUrl, 
  getEndpoint, 
  requiresAuth 
} from '../constants/apiEndpoints';

/**
 * Generic API call function
 * @param {string} category - API category (USER, PRODUCT, etc.)
 * @param {string} key - Endpoint key
 * @param {object} options - Request options
 * @param {object} options.urlParams - URL parameters to replace
 * @param {object} options.queryParams - Query parameters
 * @param {object} options.data - Request body data
 * @param {object} options.config - Additional axios config
 * @returns {Promise} Axios response
 */
const apiCall = async (category, key, options = {}) => {
  const { urlParams = {}, queryParams = {}, data, config = {} } = options;
  const endpoint = getEndpoint(category, key);
  
  if (!endpoint) {
    throw new Error(`API endpoint not found: ${category}.${key}`);
  }

  const url = getCompleteUrl(category, key, urlParams, queryParams);
  
  const requestConfig = {
    method: endpoint.method.toLowerCase(),
    url,
    ...config
  };

  if (data) {
    if (endpoint.method === 'GET') {
      // For GET requests, add data as query params
      requestConfig.params = data;
    } else {
      // For other methods, add data as body
      requestConfig.data = data;
    }
  }

  return axiosInstance(requestConfig);
};

/**
 * User API Service
 */
export const userApi = {
  // Authentication
  register: (userData) => 
    apiCall('USER', 'REGISTER', { data: userData }),
  
  login: (credentials) => 
    apiCall('USER', 'LOGIN', { data: credentials }),
  
  logout: () => 
    apiCall('USER', 'LOGOUT'),
  
  forgotPassword: (email) => 
    apiCall('USER', 'FORGOT_PASSWORD', { data: { email } }),
  
  resetPassword: (token, passwordData) => 
    apiCall('USER', 'RESET_PASSWORD', { 
      urlParams: { token }, 
      data: passwordData 
    }),

  // Profile Management
  getMyDetails: () => 
    apiCall('USER', 'GET_MY_DETAILS'),
  
  updatePassword: (passwordData) => 
    apiCall('USER', 'UPDATE_PASSWORD', { data: passwordData }),
  
  updateProfile: (profileData) => 
    apiCall('USER', 'UPDATE_PROFILE', { data: profileData }),
  
  uploadImage: (formData) => 
    apiCall('USER', 'UPLOAD_IMAGE', { 
      data: formData, 
      config: { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      } 
    }),

  // Admin User Management
  getAllUsers: () => 
    apiCall('USER', 'GET_ALL_USERS'),
  
  getSingleUser: (userId) => 
    apiCall('USER', 'GET_SINGLE_USER', { urlParams: { id: userId } }),
  
  updateUserProfile: (userId, userData) => 
    apiCall('USER', 'UPDATE_USER_PROFILE', { 
      urlParams: { id: userId }, 
      data: userData 
    }),
  
  deleteUser: (userId) => 
    apiCall('USER', 'DELETE_USER', { urlParams: { id: userId } }),
};

/**
 * Product API Service
 */
export const productApi = {
  // Public Product Access
  getAllProducts: (params = {}) => 
    apiCall('PRODUCT', 'GET_ALL_PRODUCTS', { queryParams: params }),
  
  getProductDetails: (productId) => 
    apiCall('PRODUCT', 'GET_PRODUCT_DETAILS', { urlParams: { id: productId } }),

  // Product Reviews
  createProductReview: (reviewData) => 
    apiCall('PRODUCT', 'CREATE_PRODUCT_REVIEW', { data: reviewData }),
  
  getProductReviews: (params = {}) => 
    apiCall('PRODUCT', 'GET_PRODUCT_REVIEWS', { queryParams: params }),
  
  deleteReviews: (reviewIds) => 
    apiCall('PRODUCT', 'DELETE_REVIEWS', { data: { reviewIds } }),

  // Admin Product Management
  createProduct: (productData) => 
    apiCall('PRODUCT', 'CREATE_PRODUCT', { data: productData }),
  
  updateProduct: (productId, productData) => 
    apiCall('PRODUCT', 'UPDATE_PRODUCT', { 
      urlParams: { id: productId }, 
      data: productData 
    }),
  
  deleteProduct: (productId) => 
    apiCall('PRODUCT', 'DELETE_PRODUCT', { urlParams: { id: productId } }),
};

/**
 * Cart API Service
 */
export const cartApi = {
  addToCart: (cartData) => 
    apiCall('CART', 'ADD_TO_CART', { data: cartData }),
  
  getMyCart: () => 
    apiCall('CART', 'GET_MY_CART'),
  
  updateCartItem: (cartData) => 
    apiCall('CART', 'UPDATE_CART_ITEM', { data: cartData }),
  
  deleteCartItem: (productId) => 
    apiCall('CART', 'DELETE_CART_ITEM', { urlParams: { product: productId } }),
};

/**
 * Order API Service
 */
export const orderApi = {
  // User Order Operations
  createOrder: (orderData) => 
    apiCall('ORDER', 'CREATE_ORDER', { data: orderData }),
  
  getOrderDetails: (orderId) => 
    apiCall('ORDER', 'GET_ORDER_DETAILS', { urlParams: { id: orderId } }),
  
  getMyOrders: () => 
    apiCall('ORDER', 'GET_MY_ORDERS'),

  // Admin Order Management
  getAllOrders: () => 
    apiCall('ORDER', 'GET_ALL_ORDERS'),
  
  updateOrderStatus: (orderId, statusData) => 
    apiCall('ORDER', 'UPDATE_ORDER_STATUS', { 
      urlParams: { id: orderId }, 
      data: statusData 
    }),
  
  deleteOrder: (orderId) => 
    apiCall('ORDER', 'DELETE_ORDER', { urlParams: { id: orderId } }),
};

/**
 * Payment API Service
 */
export const paymentApi = {
  createPayment: (paymentData) => 
    apiCall('PAYMENT', 'CREATE_PAYMENT', { data: paymentData }),
  
  getPaymentStatus: (paymentRequestId) => 
    apiCall('PAYMENT', 'GET_PAYMENT_STATUS', { 
      urlParams: { payment_request_id: paymentRequestId } 
    }),
};

/**
 * Upload API Service
 */
export const uploadApi = {
  uploadSingle: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiCall('UPLOAD', 'UPLOAD_SINGLE', { 
      data: formData, 
      config: { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      } 
    });
  },
  
  uploadMultiple: (files) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files`, file);
    });
    return apiCall('UPLOAD', 'UPLOAD_MULTIPLE', { 
      data: formData, 
      config: { 
        headers: { 'Content-Type': 'multipart/form-data' } 
      } 
    });
  },
  
  deleteImage: (publicId) => 
    apiCall('UPLOAD', 'DELETE_IMAGE', { urlParams: { publicId } }),
  
  getUploadStats: () => 
    apiCall('UPLOAD', 'GET_UPLOAD_STATS'),
};

/**
 * Generic API service with all endpoints
 */
export const apiService = {
  user: userApi,
  product: productApi,
  cart: cartApi,
  order: orderApi,
  payment: paymentApi,
  upload: uploadApi,
  
  // Generic method for custom calls
  call: apiCall,
  
  // Helper methods
  requiresAuth: (category, key) => requiresAuth(category, key),
  getEndpoint: (category, key) => getEndpoint(category, key),
};

export default apiService;
