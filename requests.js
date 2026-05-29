import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { movieApi } from "../constants/axios"
import { movieRequests } from "../constants/requests"

const initialState = {
  movies: {
    "Top Rated": [],
    Trending: [],
    Comedy: [],
    Horror: [],
    Documentaries: [],
    "Netflix Originals": [],
  },
  status: "idle",
  error: null
}

export const getMovies = createAsyncThunk("movies/fetchMovie", async () => {
  try {
    const response = await movieApi.get(movieRequests.fetchAllMovies)
    return response.data
  }catch(error){
    return error.response.data
  }
})

export const addMovies = createAsyncThunk("movies/add", async (movieData) => {
  try {
    const response = await movieApi.post(movieRequests.addMovie,movieData)
    return response.data.movie
  }catch(error){
    return error.response.data
  }
})

const movieSlice = createSlice({
  name: "movies",
  initialState, // initialState: initialState
  // reducers: (create) => ({
  //   fetchMovies: create.asyncThunk(
  //     async () => {
  //       const response = await movieApi.get(movieRequests.fetchAllMovies)
  //       console.log(response)
  //       return response.data
  //     },
  //     {
  //       pending: (state) => {
  //         state.status = "loading"
  //       },
  //       rejected: (state, action) => {
  //         console.log(action)
  //         state.error = action.error.message
  //         state.status = "failed"
  //       },
  //       fulfilled: (state, action) => {
  //         console.log(action)
  //         state.status = "succes"
  //         state.movies = action.payload
  //       },
  //     },
  //   )
  // }),
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.status = "loading"
    })
    .addCase(getMovies.rejected, (state, action) => {
      console.log(action)
      state.error = action.error.message
      state.status = "failed"
    })
    .addCase(getMovies.fulfilled, (state, action) => {
    
      state.movies = action.payload.movies
      state.status = "success"
    })
    .addCase(addMovies.pending, (state, action) => {
      state.status = "loading"
    })
    .addCase(addMovies.rejected, (state, action) => {
      
      state.error = action.error.message
      state.status = "failed"
    })
    .addCase(addMovies.fulfilled, (state, action) => {
      
      //state.movies = action.payload.movies
      state.movies[action.payload.type].push(action.payload)
      state.status = "success"
    })
  }


  

})

export default movieSlice.reducer

export const selectAllMovies = (state) => state.movies.movies
export const getMoviesStatus = (state) => state.movies.status
export const getMoviesError = (state) => state.movies.error