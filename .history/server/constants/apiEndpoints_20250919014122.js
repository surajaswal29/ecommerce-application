/**
 * API Endpoints Constants
 * Centralized definition of all API endpoints for the ecommerce application
 *
 * Usage:
 * const { API_ENDPOINTS } = require('./constants/apiEndpoints');
 * const userEndpoints = API_ENDPOINTS.USER;
 */

const API_ENDPOINTS = {
  // Base API prefix (as defined in main server file)
  BASE: '/api/v1',

  // User Authentication & Management Endpoints
  USER: {
    // Authentication
    REGISTER: {
      path: '/user/register',
      method: 'POST',
      auth: false,
      description: 'Register a new user',
    },
    LOGIN: {
      path: '/user/login',
      method: 'POST',
      auth: false,
      description: 'User login',
    },
    LOGOUT: {
      path: '/user/logout',
      method: 'GET',
      auth: false,
      description: 'User logout',
    },
    FORGOT_PASSWORD: {
      path: '/user/password/forgot',
      method: 'POST',
      auth: false,
      description: 'Request password reset',
    },
    RESET_PASSWORD: {
      path: '/user/password/reset/:token',
      method: 'PUT',
      auth: false,
      description: 'Reset password with token',
    },

    // User Profile
    GET_MY_DETAILS: {
      path: '/user/me',
      method: 'GET',
      auth: true,
      description: 'Get current user details',
    },
    UPDATE_PASSWORD: {
      path: '/user/password/update',
      method: 'PUT',
      auth: true,
      description: 'Update user password',
    },
    UPDATE_PROFILE: {
      path: '/user/me/update',
      method: 'PUT',
      auth: true,
      description: 'Update user profile',
    },
    UPLOAD_IMAGE: {
      path: '/user/upload_file',
      method: 'POST',
      auth: false,
      description: 'Upload user profile image',
    },

    // Admin User Management
    GET_ALL_USERS: {
      path: '/user/admin/users',
      method: 'GET',
      auth: true,
      roles: ['admin'],
      description: 'Get all users (admin only)',
    },
    GET_SINGLE_USER: {
      path: '/user/admin/user/:id',
      method: 'GET',
      auth: true,
      roles: ['admin'],
      description: 'Get single user by ID (admin only)',
    },
    UPDATE_USER_PROFILE: {
      path: '/user/admin/user/:id',
      method: 'PUT',
      auth: true,
      roles: ['admin'],
      description: 'Update user profile (admin only)',
    },
    DELETE_USER: {
      path: '/user/admin/user/:id',
      method: 'DELETE',
      auth: true,
      roles: ['admin'],
      description: 'Delete user (admin only)',
    },
  },

  // Product Management Endpoints
  PRODUCT: {
    // Public Product Access
    GET_ALL_PRODUCTS: {
      path: '/product/products',
      method: 'GET',
      auth: false,
      description: 'Get all products with filtering and pagination',
    },
    GET_PRODUCT_DETAILS: {
      path: '/product/product/:id',
      method: 'GET',
      auth: false,
      description: 'Get single product details',
    },

    // Product Reviews
    CREATE_PRODUCT_REVIEW: {
      path: '/product/review',
      method: 'PUT',
      auth: true,
      description: 'Create or update product review',
    },
    GET_PRODUCT_REVIEWS: {
      path: '/product/reviews',
      method: 'GET',
      auth: false,
      description: 'Get product reviews',
    },
    DELETE_REVIEWS: {
      path: '/product/reviews',
      method: 'DELETE',
      auth: true,
      description: 'Delete product reviews',
    },

    // Admin Product Management
    CREATE_PRODUCT: {
      path: '/product/admin/product/new',
      method: 'POST',
      auth: true,
      roles: ['admin'],
      description: 'Create new product (admin only)',
    },
    UPDATE_PRODUCT: {
      path: '/product/admin/product/:id',
      method: 'PUT',
      auth: true,
      roles: ['admin'],
      description: 'Update product (admin only)',
    },
    DELETE_PRODUCT: {
      path: '/product/admin/product/:id',
      method: 'DELETE',
      auth: true,
      roles: ['admin'],
      description: 'Delete product (admin only)',
    },
  },

  // Shopping Cart Endpoints
  CART: {
    ADD_TO_CART: {
      path: '/cart/add_to_cart',
      method: 'POST',
      auth: true,
      description: 'Add item to cart',
    },
    GET_MY_CART: {
      path: '/cart/my_cart',
      method: 'GET',
      auth: true,
      description: 'Get user cart items',
    },
    UPDATE_CART_ITEM: {
      path: '/cart/update_cart_item',
      method: 'POST',
      auth: true,
      description: 'Update cart item quantity',
    },
    DELETE_CART_ITEM: {
      path: '/cart/delete_cart_item/:product',
      method: 'DELETE',
      auth: true,
      description: 'Remove item from cart',
    },
  },

  // Order Management Endpoints
  ORDER: {
    // User Order Operations
    CREATE_ORDER: {
      path: '/order/order/new',
      method: 'POST',
      auth: true,
      description: 'Create new order',
    },
    GET_ORDER_DETAILS: {
      path: '/order/order/:id',
      method: 'GET',
      auth: true,
      description: 'Get single order details',
    },
    GET_MY_ORDERS: {
      path: '/order/orders/me',
      method: 'GET',
      auth: true,
      description: 'Get current user orders',
    },

    // Admin Order Management
    GET_ALL_ORDERS: {
      path: '/order/admin/orders/all',
      method: 'GET',
      auth: true,
      roles: ['admin'],
      description: 'Get all orders (admin only)',
    },
    UPDATE_ORDER_STATUS: {
      path: '/order/admin/orders/update/:id',
      method: 'PUT',
      auth: true,
      roles: ['admin'],
      description: 'Update order status (admin only)',
    },
    DELETE_ORDER: {
      path: '/order/admin/orders/delete/:id',
      method: 'DELETE',
      auth: true,
      roles: ['admin'],
      description: 'Delete order (admin only)',
    },
  },

  // Payment Processing Endpoints
  PAYMENT: {
    CREATE_PAYMENT: {
      path: '/payment/create-payment',
      method: 'POST',
      auth: true,
      description: 'Create payment request',
    },
    PAYMENT_WEBHOOK: {
      path: '/payment/webhook',
      method: 'POST',
      auth: false,
      description: 'Payment webhook endpoint (no auth required)',
    },
    GET_PAYMENT_STATUS: {
      path: '/payment/payment-status/:payment_request_id',
      method: 'GET',
      auth: true,
      description: 'Get payment status by payment request ID',
    },
  },

  // File Upload Endpoints
  UPLOAD: {
    UPLOAD_SINGLE: {
      path: '/upload/single',
      method: 'POST',
      auth: false,
      description: 'Upload single image file',
    },
    UPLOAD_MULTIPLE: {
      path: '/upload/multiple',
      method: 'POST',
      auth: false,
      description: 'Upload multiple image files',
    },
    DELETE_IMAGE: {
      path: '/upload/:publicId',
      method: 'DELETE',
      auth: false,
      description: 'Delete image by public ID',
    },
    GET_UPLOAD_STATS: {
      path: '/upload/stats',
      method: 'GET',
      auth: false,
      description: 'Get upload statistics',
    },
  },
};

/**
 * Helper function to get full endpoint URL
 * @param {string} endpointPath - The endpoint path from API_ENDPOINTS
 * @param {string} baseUrl - Base URL (default: process.env.BASE_URL || 'http://localhost:4000')
 * @returns {string} Full URL
 */
const getFullUrl = (
  endpointPath,
  baseUrl = process.env.BASE_URL || 'http://localhost:4000'
) => {
  return `${baseUrl}${API_ENDPOINTS.BASE}${endpointPath}`;
};

/**
 * Helper function to get endpoint by category and key
 * @param {string} category - Category name (USER, PRODUCT, CART, ORDER, PAYMENT, UPLOAD)
 * @param {string} key - Endpoint key
 * @returns {object} Endpoint configuration
 */
const getEndpoint = (category, key) => {
  return API_ENDPOINTS[category.toUpperCase()]?.[key.toUpperCase()];
};

/**
 * Helper function to get all endpoints for a category
 * @param {string} category - Category name
 * @returns {object} All endpoints for the category
 */
const getEndpointsByCategory = (category) => {
  return API_ENDPOINTS[category.toUpperCase()];
};

/**
 * Helper function to check if endpoint requires authentication
 * @param {string} category - Category name
 * @param {string} key - Endpoint key
 * @returns {boolean} Whether endpoint requires authentication
 */
const requiresAuth = (category, key) => {
  const endpoint = getEndpoint(category, key);
  return endpoint?.auth === true;
};

/**
 * Helper function to check if endpoint requires specific roles
 * @param {string} category - Category name
 * @param {string} key - Endpoint key
 * @returns {array|null} Required roles or null if no specific roles required
 */
const getRequiredRoles = (category, key) => {
  const endpoint = getEndpoint(category, key);
  return endpoint?.roles || null;
};

module.exports = {
  API_ENDPOINTS,
  getFullUrl,
  getEndpoint,
  getEndpointsByCategory,
  requiresAuth,
  getRequiredRoles,
};
