/**
 * API Endpoints Usage Examples
 * Demonstrates how to use the API_ENDPOINTS constants in your application
 */

const {
  API_ENDPOINTS,
  getFullUrl,
  getEndpoint,
  getEndpointsByCategory,
  requiresAuth,
  getRequiredRoles,
} = require('./apiEndpoints');

// Example 1: Basic endpoint usage
console.log('=== Basic Endpoint Usage ===');
console.log('User login endpoint:', API_ENDPOINTS.USER.LOGIN.path);
console.log(
  'Product details endpoint:',
  API_ENDPOINTS.PRODUCT.GET_PRODUCT_DETAILS.path
);

// Example 2: Getting full URLs
console.log('\n=== Full URL Generation ===');
const loginUrl = getFullUrl(API_ENDPOINTS.USER.LOGIN.path);
const productUrl = getFullUrl(
  API_ENDPOINTS.PRODUCT.GET_PRODUCT_DETAILS.path,
  'https://api.myapp.com'
);
console.log('Login URL:', loginUrl);
console.log('Product URL (custom base):', productUrl);

// Example 3: Using helper functions
console.log('\n=== Helper Functions ===');
const userLogin = getEndpoint('USER', 'LOGIN');
console.log('User login config:', userLogin);

const allUserEndpoints = getEndpointsByCategory('USER');
console.log('All user endpoints:', Object.keys(allUserEndpoints));

// Example 4: Authentication checks
console.log('\n=== Authentication Checks ===');
console.log('Does login require auth?', requiresAuth('USER', 'LOGIN'));
console.log(
  'Does get profile require auth?',
  requiresAuth('USER', 'GET_MY_DETAILS')
);

// Example 5: Role requirements
console.log('\n=== Role Requirements ===');
console.log(
  'Admin user management roles:',
  getRequiredRoles('USER', 'GET_ALL_USERS')
);
console.log(
  'Product creation roles:',
  getRequiredRoles('PRODUCT', 'CREATE_PRODUCT')
);

// Example 6: Frontend API client usage
console.log('\n=== Frontend API Client Example ===');
const frontendApiClient = {
  // User authentication
  login: (credentials) => {
    const endpoint = API_ENDPOINTS.USER.LOGIN;
    return fetch(getFullUrl(endpoint.path), {
      method: endpoint.method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  },

  // Get products
  getProducts: (params = {}) => {
    const endpoint = API_ENDPOINTS.PRODUCT.GET_ALL_PRODUCTS;
    const url = new URL(getFullUrl(endpoint.path));
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
    return fetch(url.toString());
  },

  // Add to cart (requires authentication)
  addToCart: (productData, token) => {
    const endpoint = API_ENDPOINTS.CART.ADD_TO_CART;
    return fetch(getFullUrl(endpoint.path), {
      method: endpoint.method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
  },
};

// Example 7: Express route usage
console.log('\n=== Express Route Usage Example ===');
const expressRouteExample = `
// In your route file
const { API_ENDPOINTS } = require('../constants/apiEndpoints');

// Instead of hardcoding paths
app.get(API_ENDPOINTS.PRODUCT.GET_ALL_PRODUCTS.path, productController.getAllProducts);
app.post(API_ENDPOINTS.USER.REGISTER.path, userController.registerUser);

// With middleware
app.get(
  API_ENDPOINTS.USER.GET_MY_DETAILS.path,
  isAuthenticatedUser,
  userController.getUserDetails
);
`;

// Example 8: API documentation generation
console.log('\n=== API Documentation Generation ===');
const generateApiDocs = () => {
  const categories = ['USER', 'PRODUCT', 'CART', 'ORDER', 'PAYMENT', 'UPLOAD'];

  categories.forEach((category) => {
    console.log(`\n## ${category} Endpoints`);
    const endpoints = getEndpointsByCategory(category);

    Object.entries(endpoints).forEach(([key, config]) => {
      console.log(`- **${key}**: ${config.method} ${config.path}`);
      console.log(`  - Auth Required: ${config.auth ? 'Yes' : 'No'}`);
      if (config.roles) {
        console.log(`  - Roles: ${config.roles.join(', ')}`);
      }
      console.log(`  - Description: ${config.description}`);
    });
  });
};

// Example 9: Validation helper
const validateEndpoint = (category, key, method, path) => {
  const endpoint = getEndpoint(category, key);
  if (!endpoint) {
    return { valid: false, error: 'Endpoint not found' };
  }

  if (endpoint.method !== method) {
    return {
      valid: false,
      error: `Expected ${endpoint.method}, got ${method}`,
    };
  }

  if (endpoint.path !== path) {
    return { valid: false, error: `Expected ${endpoint.path}, got ${path}` };
  }

  return { valid: true };
};

// Example 10: Environment-specific configuration
const getApiConfig = (environment = 'development') => {
  const baseUrls = {
    development: 'http://localhost:4000',
    staging: 'https://staging-api.myapp.com',
    production: 'https://api.myapp.com',
  };

  return {
    baseUrl: baseUrls[environment],
    endpoints: API_ENDPOINTS,
  };
};

module.exports = {
  frontendApiClient,
  generateApiDocs,
  validateEndpoint,
  getApiConfig,
};
