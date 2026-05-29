import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieById, updateMovie, uploadMovieImage } from '../slices/movieSlice'
import Navbar from '../components/Navbar'
import useToast from '../hooks/useToast'
import { validateMovieForm } from '../utils/validation'
import "../styles/LoginPage.css"

const EditMoviePage = () => {
  const { movieId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

  const movieStatus = useSelector(state => state.movies.status)
  const movieError = useSelector(state => state.movies.error)

  const [movie, setMovie] = useState(null)
  const [movieData, setMovieData] = useState({
    title: "",
    release_date: "",
    director: "",
    genre: "",
    description: "",
    year: ""
  })

  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching movie data
    // In a real app, this would come from the API
    setIsLoading(true)
    setTimeout(() => {
      const dummyMovie = {
        _id: movieId,
        title: "Sample Movie",
        release_date: "2023-01-01",
        director: "Director Name",
        genre: "Action",
        description: "Movie Description",
        year: "2023"
      }
      setMovie(dummyMovie)
      setMovieData(dummyMovie)
      setIsLoading(false)
    }, 500)
  }, [movieId])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      toast.info(`Image "${file.name}" selected`)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const { isValid, errors: validationErrors } = validateMovieForm(movieData)
    if (!isValid) {
      setErrors(validationErrors)
      toast.error("Please fix all errors before submitting")
      return
    }

    try {
      setIsLoading(true)
      
      // Update movie
      await dispatch(updateMovie({
        id: movieId,
        movieData
      }))

      // If image is selected, upload it
      if (image) {
        const formData = new FormData()
        formData.append("file", image)
        await dispatch(uploadMovieImage({
          id: movieId,
          formData
        }))
      }

      toast.success("Movie updated successfully!")
      setTimeout(() => {
        navigate(`/movie/${movieId}`)
      }, 1500)
    } catch (error) {
      toast.error("Failed to update movie")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(`/movie/${movieId}`)
  }

  if (isLoading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
        <h1>Edit Movie</h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Movie Title"
              value={movieData.title}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                borderColor: errors.title ? "red" : "#ccc"
              }}
            />
            {errors.title && <span style={{ color: "red", fontSize: "12px" }}>{errors.title}</span>}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Release Date</label>
            <input
              type="date"
              name="release_date"
              value={movieData.release_date}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Year</label>
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={movieData.year}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                borderColor: errors.year ? "red" : "#ccc"
              }}
            />
            {errors.year && <span style={{ color: "red", fontSize: "12px" }}>{errors.year}</span>}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Director *</label>
            <input
              type="text"
              name="director"
              placeholder="Director Name"
              value={movieData.director}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                borderColor: errors.director ? "red" : "#ccc"
              }}
            />
            {errors.director && <span style={{ color: "red", fontSize: "12px" }}>{errors.director}</span>}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Genre *</label>
            <input
              type="text"
              name="genre"
              placeholder="Genre (e.g. Action, Comedy)"
              value={movieData.genre}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                borderColor: errors.genre ? "red" : "#ccc"
              }}
            />
            {errors.genre && <span style={{ color: "red", fontSize: "12px" }}>{errors.genre}</span>}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Movie Description"
              value={movieData.description}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "8px", minHeight: "100px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Update Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: "100%", padding: "8px" }}
            />
            {image && <p style={{ color: "green", fontSize: "12px" }}>New image: {image.name}</p>}
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="submit"
              disabled={movieStatus === "loading"}
              style={{
                padding: "10px 20px",
                backgroundColor: "#e50914",
                color: "white",
                border: "none",
                cursor: movieStatus === "loading" ? "not-allowed" : "pointer",
                borderRadius: "4px"
              }}
            >
              {movieStatus === "loading" ? "Updating..." : "Update Movie"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                padding: "10px 20px",
                backgroundColor: "#666",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "4px"
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditMoviePage
