import { useState } from "react"
import { useDispatch } from "react-redux"
import { addMovies } from "../slices/movieSlice"

const AddMovieForm = () => {
  const dispatch = useDispatch()

  const [movieData, setMovieData] = useState({
    title: "",
    release_date: "",
    author: "",
    type: "",
    overview: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addMovies(movieData))
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setMovieData({...movieData, title: e.target.value})}
      />
      <input
        type="date"
        placeholder="Release Date"
        onChange={(e) => setMovieData({...movieData, release_date: e.target.value})}
      />
      <input
        type="text"
        placeholder="Author"
        onChange={(e) => setMovieData({...movieData, author: e.target.value})}
      />
      <input
        type="text"
        placeholder="Type (e.g. Comedy, Horror)"
        onChange={(e) => setMovieData({...movieData, type: e.target.value})}
      />
      <input
        type="text"
        placeholder="Overview"
        onChange={(e) => setMovieData({...movieData, overview: e.target.value})}
      />
      <button onClick={(e) => handleSubmit(e)}>Add Movie</button>
    </div>
  )
}

export default AddMovieForm