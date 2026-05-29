import { useDispatch, useSelector } from "react-redux"
import { registerUser, loginUser, logoutUser, getUserProfile, selectUser, selectUserStatus, selectIsAuthenticated } from "../slices/userSlice"

const useUser = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const status = useSelector(selectUserStatus)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const register = (userData) => {
    return dispatch(registerUser(userData))
  }

  const login = (credentials) => {
    return dispatch(loginUser(credentials))
  }

  const logout = () => {
    return dispatch(logoutUser())
  }

  const getProfile = () => {
    return dispatch(getUserProfile())
  }

  return { user, status, isAuthenticated, register, login, logout, getProfile }
}

export default useUser
