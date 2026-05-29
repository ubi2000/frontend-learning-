import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addMovies, uploadMovieImage } from "../slices/movieSlice"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"

const AddMovieForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const movieStatus = useSelector(state => state.movies.status)
  const movieError = useSelector(state => state.movies.error)

  const [movieData, setMovieData] = useState({
    title: "",
    release_date: "",
    director: "",
    genre: "",
    description: "",
    year: ""
  })

  const [image, setImage] = useState(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (movieStatus === "success") {
      setMessage("Movie added successfully!")
      setTimeout(() => {
        navigate("/home")
      }, 2000)
    }
    if (movieError) {
      setMessage(`Error: ${movieError?.message || "Failed to add movie"}`)
    }
  }, [movieStatus, movieError, navigate])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage("")

    if (!movieData.title || !movieData.director || !movieData.genre) {
      setMessage("Please fill in required fields (Title, Director, Genre)")
      return
    }

    try {
      // Add movie first
      const result = await dispatch(addMovies(movieData))
      
      // If image is selected and movie was added successfully, upload image
      if (result.payload && image) {
        const formData = new FormData()
        formData.append("file", image)
        
        await dispatch(uploadMovieImage({
          id: result.payload._id || result.payload.id,
          formData
        }))
      }
    } catch (error) {
      setMessage("Error adding movie")
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
        <h1>Add New Movie</h1>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Title *</label>
            <input
              type="text"
              placeholder="Movie Title"
              value={movieData.title}
              onChange={(e) => setMovieData({...movieData, title: e.target.value})}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Release Date</label>
            <input
              type="date"
              value={movieData.release_date}
              onChange={(e) => setMovieData({...movieData, release_date: e.target.value})}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Year</label>
            <input
              type="number"
              placeholder="Year"
              value={movieData.year}
              onChange={(e) => setMovieData({...movieData, year: e.target.value})}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Director *</label>
            <input
              type="text"
              placeholder="Director Name"
              value={movieData.director}
              onChange={(e) => setMovieData({...movieData, director: e.target.value})}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Genre *</label>
            <input
              type="text"
              placeholder="Genre (e.g. Comedy, Horror)"
              value={movieData.genre}
              onChange={(e) => setMovieData({...movieData, genre: e.target.value})}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Description</label>
            <textarea
              placeholder="Movie Description"
              value={movieData.description}
              onChange={(e) => setMovieData({...movieData, description: e.target.value})}
              style={{ width: "100%", padding: "8px", minHeight: "100px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Movie Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ width: "100%", padding: "8px" }}
            />
            {image && <p style={{ color: "green" }}>Image selected: {image.name}</p>}
          </div>

          <button 
            type="submit" 
            disabled={movieStatus === "loading"}
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "#e50914", 
              color: "white",
              border: "none",
              cursor: movieStatus === "loading" ? "not-allowed" : "pointer"
            }}
          >
            {movieStatus === "loading" ? "Adding..." : "Add Movie"}
          </button>

          {message && (
            <p style={{ marginTop: "20px", color: movieStatus === "success" ? "green" : "red" }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default AddMovieForm