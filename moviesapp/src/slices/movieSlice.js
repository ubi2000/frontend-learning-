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
    const response = await movieApi.post(movieRequests.addMovie, movieData)
    return response.data.movie
  } catch(error){
    throw error.response?.data || error.message
  }
})

export const getMovieById = createAsyncThunk("movies/getById", async (id) => {
  try {
    const response = await movieApi.get(`${movieRequests.getMovieById}/${id}`)
    return response.data
  } catch(error){
    throw error.response?.data || error.message
  }
})

export const updateMovie = createAsyncThunk("movies/update", async ({ id, movieData }) => {
  try {
    const response = await movieApi.put(`${movieRequests.updateMovie}/${id}`, movieData)
    return response.data.movie
  } catch(error){
    throw error.response?.data || error.message
  }
})

export const uploadMovieImage = createAsyncThunk("movies/uploadImage", async ({ id, formData }) => {
  try {
    const response = await movieApi.post(`${movieRequests.uploadImage}/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch(error){
    throw error.response?.data || error.message
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
      state.error = action.payload
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
      
      state.error = action.payload
      state.status = "failed"
    })
    .addCase(addMovies.fulfilled, (state, action) => {
      
      //state.movies = action.payload.movies
      state.movies[action.payload.type].push(action.payload)
      state.status = "success"
    })
    .addCase(getMovieById.pending, (state) => {
      state.status = "loading"
    })
    .addCase(getMovieById.fulfilled, (state, action) => {
      state.status = "success"
      state.error = null
    })
    .addCase(getMovieById.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
    })
    .addCase(updateMovie.pending, (state) => {
      state.status = "loading"
    })
    .addCase(updateMovie.fulfilled, (state, action) => {
      state.status = "success"
      state.error = null
    })
    .addCase(updateMovie.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
    })
    .addCase(uploadMovieImage.pending, (state) => {
      state.status = "loading"
    })
    .addCase(uploadMovieImage.fulfilled, (state, action) => {
      state.status = "success"
      state.error = null
    })
    .addCase(uploadMovieImage.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.payload
    })
  }


  

})

export default movieSlice.reducer

export const selectAllMovies = (state) => state.movies.movies
export const getMoviesStatus = (state) => state.movies.status
export const getMoviesError = (state) => state.movies.error
export const getMoviesStatus = (state) => state.movies.status
export const getMoviesError = (state) => state.movies.error