import { useDispatch, useSelector } from "react-redux"
import { getMovies, addMovies, getMovieById, updateMovie, uploadMovieImage, selectAllMovies } from "../slices/movieSlice"

const useMovies = () => {
  const dispatch = useDispatch()
  const movies = useSelector(selectAllMovies)

  const fetchAllMovies = () => {
    return dispatch(getMovies())
  }

  const addMovie = (movieData) => {
    return dispatch(addMovies(movieData))
  }

  const fetchMovieById = (id) => {
    return dispatch(getMovieById(id))
  }

  const editMovie = (id, movieData) => {
    return dispatch(updateMovie({ id, movieData }))
  }

  const uploadImage = (id, formData) => {
    return dispatch(uploadMovieImage({ id, formData }))
  }

  return { movies, fetchAllMovies, addMovie, fetchMovieById, editMovie, uploadImage }
}

export default useMovies
