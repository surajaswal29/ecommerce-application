/**
 * Authentication Service
 * Handles localStorage operations for JWT tokens and API calls
 */

import { userApi } from './apiService';

const TOKEN_KEY = "authToken"

/**
 * Get token from localStorage
 * @returns {string|null} The stored token or null if not found
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch (error) {
    console.error("Error getting token from localStorage:", error)
    return null
  }
}

/**
 * Save token to localStorage
 * @param {string} token - The JWT token to store
 * @returns {boolean} True if successful, false otherwise
 */
export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token)
    return true
  } catch (error) {
    console.error("Error saving token to localStorage:", error)
    return false
  }
}

/**
 * Remove token from localStorage
 * @returns {boolean} True if successful, false otherwise
 */
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY)
    return true
  } catch (error) {
    console.error("Error removing token from localStorage:", error)
    return false
  }
}

/**
 * Check if token exists in localStorage
 * @returns {boolean} True if token exists, false otherwise
 */
export const hasToken = () => {
  return getToken() !== null
}

/**
 * Decode JWT token payload (without verification)
 * @param {string} token - The JWT token to decode
 * @returns {object|null} Decoded payload or null if invalid
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null

    const base64Url = token.split(".")[1]
    if (!base64Url) return null

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )

    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

/**
 * Check if token is expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} True if expired, false otherwise
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return true

    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp < currentTime
  } catch (error) {
    console.error("Error checking token expiration:", error)
    return true
  }
}

/**
 * Check if current stored token is valid (exists and not expired)
 * @returns {boolean} True if token is valid, false otherwise
 */
export const isTokenValid = () => {
  const token = getToken()
  return token && !isTokenExpired(token)
}
