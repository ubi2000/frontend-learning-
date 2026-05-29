import { configureStore } from "@reduxjs/toolkit";
import movieSlice from '../slices/movieSlice'
import commentSlice from '../slices/commentSlice'
import ratingSlice from '../slices/ratingSlice'
import userSlice from '../slices/userSlice'

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    comments: commentSlice,
    ratings: ratingSlice,
    user: userSlice,
  }
});
