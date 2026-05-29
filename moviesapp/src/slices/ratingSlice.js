import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { movieApi } from "../constants/axios"
import { ratingRequests } from "../constants/requests"

const initialState = {
  ratings: [],
  status: "idle",
  error: null
}

// Add rating to a movie
export const addRating = createAsyncThunk(
  "ratings/add", 
  async ({ movieId, ratingData }) => {
    try {
      const response = await movieApi.post(
        `${ratingRequests.addRating}/${movieId}`,
        ratingData
      )
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
)

const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addRating.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.ratings.push(action.payload.rating || action.payload)
        state.status = "success"
        state.error = null
      })
      .addCase(addRating.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  }
})

export default ratingSlice.reducer

export const selectAllRatings = (state) => state.ratings.ratings
export const selectRatingsStatus = (state) => state.ratings.status
export const selectRatingsError = (state) => state.ratings.error
