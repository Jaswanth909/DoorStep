// API Configuration
// This file handles environment-specific API endpoints

const API_CONFIG = {
  // Development Environment
  development: {
    baseURL: 'http://localhost:8080/api',
    timeout: 30000,
    retryAttempts: 3
  },
  
  // Production Environment
  production: {
    baseURL: 'https://doorstep-app.onrender.com/api',
    timeout: 30000,
    retryAttempts: 3
  },
  
  // Staging Environment
  staging: {
    baseURL: 'https://staging-doorstep.onrender.com/api',
    timeout: 30000,
    retryAttempts: 3
  }
};

// Detect current environment
const getEnvironment = () => {
  if (typeof process !== 'undefined' && process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  
  // Check hostname for environment detection
  const hostname = window.location.hostname;
  if (hostname.includes('localhost')) return 'development';
  if (hostname.includes('doorstep.netlify.app')) return 'production';
  if (hostname.includes('staging')) return 'staging';
  
  return 'production'; // Default to production
};

// Get current environment config
const currentEnvironment = getEnvironment();
const currentConfig = API_CONFIG[currentEnvironment] || API_CONFIG.production;

// Export for use in application
const API_BASE_URL = currentEnvironment === 'production' 
  ? 'https://doorstep-app.onrender.com/api'
  : 'http://localhost:8080/api';

const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  
  // Products
  GET_PRODUCTS: '/products',
  GET_PRODUCT: '/products/:id',
  SEARCH_PRODUCTS: '/products/search',
  
  // Cart
  GET_CART: '/cart',
  ADD_TO_CART: '/cart/add',
  REMOVE_FROM_CART: '/cart/remove',
  UPDATE_CART: '/cart/update',
  
  // Orders
  CREATE_ORDER: '/orders',
  GET_ORDERS: '/orders',
  GET_ORDER: '/orders/:id',
  
  // User
  GET_PROFILE: '/user/profile',
  UPDATE_PROFILE: '/user/profile',
  
  // Payment
  CREATE_PAYMENT: '/payment/process'
};

// API Call Helper Function
const apiCall = async (method, endpoint, data = null) => {
  try {
    const url = API_BASE_URL + endpoint;
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Add body for POST, PUT requests
    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// Example usage: apiCall('GET', API_ENDPOINTS.GET_PRODUCTS)
