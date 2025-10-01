import axios from "axios"
import { getToken, removeToken } from "./authService"
import { getBaseUrl } from "../constants/apiEndpoints"

// Create axios instance
const apiClient = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // If token is invalid or expired, remove it
    if (error.response?.status === 401) {
      removeToken()
      // Optionally redirect to login page
      window.location.href = "/user/login"
    }
    return Promise.reject(error)
  }
)

export default apiClient
