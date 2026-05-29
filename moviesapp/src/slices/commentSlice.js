import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { movieApi } from "../constants/axios"
import { commentRequests } from "../constants/requests"

const initialState = {
  comments: [],
  status: "idle",
  error: null
}

// Get comments for a specific movie
export const getCommentsByMovieId = createAsyncThunk(
  "comments/getByMovieId", 
  async (movieId) => {
    try {
      const response = await movieApi.get(`${commentRequests.getCommentsByMovieId}/${movieId}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
)

// Add comment to a movie
export const addComment = createAsyncThunk(
  "comments/add", 
  async ({ movieId, commentData }) => {
    try {
      const response = await movieApi.post(
        `${commentRequests.addComment}/${movieId}`,
        commentData
      )
      return response.data
    } catch (error) {
      throw error.response?.data || error.message
    }
  }
)

const commentSlice = createSlice({
  name: "comments",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByMovieId.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getCommentsByMovieId.fulfilled, (state, action) => {
        state.comments = action.payload.comments || action.payload
        state.status = "success"
        state.error = null
      })
      .addCase(getCommentsByMovieId.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
      .addCase(addComment.pending, (state) => {
        state.status = "loading"
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload.comment || action.payload)
        state.status = "success"
        state.error = null
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  }
})

export default commentSlice.reducer

export const selectAllComments = (state) => state.comments.comments
export const selectCommentsStatus = (state) => state.comments.status
export const selectCommentsError = (state) => state.comments.error
