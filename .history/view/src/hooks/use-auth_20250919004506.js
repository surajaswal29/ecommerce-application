import { useSelector, useDispatch } from "react-redux"
import { useCallback } from "react"
import {
  loginUser,
  registerUser,
  loadUser,
  updateUser,
  logoutUser,
  clearError,
} from "../store/slices/authSlice"

/**
 * Custom hook for authentication state and actions
 * @returns {Object} Auth state and actions
 */
export const useAuth = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)

  // Auth actions
  const login = useCallback(
    (credentials) => dispatch(loginUser(credentials)),
    [dispatch]
  )

  const register = useCallback(
    (userData) => dispatch(registerUser(userData)),
    [dispatch]
  )

  const loadUserData = useCallback(() => dispatch(loadUser()), [dispatch])

  const updateUserData = useCallback(
    (updateData) => dispatch(updateUser(updateData)),
    [dispatch]
  )

  const logout = useCallback(() => dispatch(logoutUser()), [dispatch])

  const clearAuthError = useCallback(() => dispatch(clearError()), [dispatch])

  // Computed values
  const isAuthenticated = auth.isAuthenticated && !!auth.token
  const isLoading = auth.loading
  const error = auth.error
  const user = auth.user

  return {
    // State
    isAuthenticated,
    isLoading,
    error,
    user,
    token: auth.token,

    // Actions
    login,
    register,
    loadUser,
    updateUser,
    logout,
    clearError: clearAuthError,
  }
}

export default useAuth
