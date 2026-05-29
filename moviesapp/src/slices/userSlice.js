import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { movieApi } from "../constants/axios"
import { userRequests } from "../constants/requests"

const initialState = {
  user: null,
  status: "idle",
  error: null,
  isAuthenticated: false
}

// Register user
export const registerUser = createAsyncThunk(
  "user/register", 
  async (userData) => {
    try {
      const response = await movieApi.post(userRequests.register, userData)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
)

// Login user
export const loginUser = createAsyncThunk(
  "user/login", 
  async (credentials) => {
    try {
      const response = await movieApi.post(userRequests.login, credentials)
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
)

// Get user profile
export const getUserProfile = createAsyncThunk(
  "user/getProfile", 
  async () => {
    try {
      const response = await movieApi.get(userRequests.getProfile)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
)

// Logout user
export const logoutUser = createAsyncThunk(
  "user/logout", 
  async () => {
    try {
      await movieApi.post(userRequests.logout)
      localStorage.removeItem('user')
      return null
    } catch (error) {
      // Still remove from local storage even if request fails
      localStorage.removeItem('user')
      throw error.response?.data || error.message
    }
  }
)

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.status = "success"
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.status = "success"
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
        state.isAuthenticated = false
      })
      // Get Profile
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.user = action.payload
        state.isAuthenticated = true
        state.status = "success"
        state.error = null
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading"
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.status = "success"
        state.error = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null
        state.isAuthenticated = false
        state.status = "failed"
        state.error = action.payload
      })
  }
})

export default userSlice.reducer

export const selectUser = (state) => state.user.user
export const selectIsAuthenticated = (state) => state.user.isAuthenticated
export const selectUserStatus = (state) => state.user.status
export const selectUserError = (state) => state.user.error
