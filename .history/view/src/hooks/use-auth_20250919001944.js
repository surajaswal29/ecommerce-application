import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  getToken,
  setToken,
  removeToken,
  isTokenValid,
  decodeToken,
} from "../service/authService"
import { loadUser, logoutUser } from "../actions/userAction"

/**
 * Custom hook for authentication management
 * Handles token validation, user state, and logout functionality
 */
export const useAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated, loading } = useSelector((state) => state.user)

  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken()

      if (token && isTokenValid()) {
        // Token exists and is valid, load user data
        try {
          await dispatch(loadUser())
        } catch (error) {
          console.error("Error loading user:", error)
          // If loading user fails, clear token
          removeToken()
        }
      } else if (token) {
        // Token exists but is expired, remove it
        removeToken()
      }

      setIsInitialized(true)
    }

    initializeAuth()
  }, [dispatch])

  /**
   * Login function - saves token and loads user data
   * @param {string} token - JWT token from login response
   * @param {object} userData - User data from login response
   */
  const login = (token, userData) => {
    if (setToken(token)) {
      // Token saved successfully, user data should be handled by Redux
      console.log("Login successful, token saved")
    } else {
      console.error("Failed to save token")
    }
  }

  /**
   * Logout function - removes token and clears user state
   */
  const logout = () => {
    removeToken()
    dispatch(logoutUser())
    navigate("/user/login")
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  const isLoggedIn = () => {
    return isAuthenticated && isTokenValid()
  }

  /**
   * Get current user data
   * @returns {object|null} Current user data or null
   */
  const getCurrentUser = () => {
    return user || null
  }

  /**
   * Get user role
   * @returns {string} User role or 'user' as default
   */
  const getUserRole = () => {
    return user?.role || "user"
  }

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean} True if user has the role
   */
  const hasRole = (role) => {
    return getUserRole() === role
  }

  /**
   * Check if user is admin
   * @returns {boolean} True if user is admin
   */
  const isAdmin = () => {
    return hasRole("admin")
  }

  /**
   * Get token expiration time
   * @returns {Date|null} Token expiration date or null
   */
  const getTokenExpiration = () => {
    const token = getToken()
    if (!token) return null

    const decoded = decodeToken(token)
    if (!decoded || !decoded.exp) return null

    return new Date(decoded.exp * 1000)
  }

  /**
   * Check if token will expire soon (within specified minutes)
   * @param {number} minutes - Minutes threshold (default: 30)
   * @returns {boolean} True if token expires soon
   */
  const isTokenExpiringSoon = (minutes = 30) => {
    const expiration = getTokenExpiration()
    if (!expiration) return true

    const now = new Date()
    const timeDiff = expiration.getTime() - now.getTime()
    const minutesDiff = timeDiff / (1000 * 60)

    return minutesDiff <= minutes
  }

  return {
    // State
    user: getCurrentUser(),
    isAuthenticated: isLoggedIn(),
    loading,
    isInitialized,

    // Actions
    login,
    logout,

    // Utilities
    isLoggedIn,
    getCurrentUser,
    getUserRole,
    hasRole,
    isAdmin,
    getTokenExpiration,
    isTokenExpiringSoon,
  }
}
