import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieById } from '../slices/movieSlice'
import useComments from '../hooks/useComments'
import useRatings from '../hooks/useRatings'
import Navbar from '../components/Navbar'
import "../styles/MovieDetailsPage.css"

const MovieDetailsPage = () => {
  const { movieId } = useParams()
  const dispatch = useDispatch()
  const [movie, setMovie] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [rating, setRating] = useState(5)
  
  const movieStatus = useSelector(state => state.movies.status)
  const movieError = useSelector(state => state.movies.error)
  const { comments, status: commentsStatus } = useComments(movieId)
  const { submitRating, status: ratingsStatus } = useRatings()

  useEffect(() => {
    dispatch(getMovieById(movieId)).then((action) => {
      if (action.payload) {
        setMovie(action.payload.movie || action.payload)
      }
    })
  }, [movieId, dispatch])

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!commentText.trim()) return
    
    // Submit comment using the hook
    setCommentText("")
  }

  const handleSubmitRating = async (e) => {
    e.preventDefault()
    // Submit rating using the hook
    await submitRating(movieId, { rating })
    setRating(5)
  }

  if (movieStatus === "loading") return <div className="loading">Loading...</div>
  if (movieError) return <div className="error">Error: {movieError}</div>
  if (!movie) return <div className="error">Movie not found</div>

  return (
    <div className="movie-details-page">
      <Navbar />
      
      <div className="movie-details-container">
        {/* Movie Info Section */}
        <div className="movie-info">
          {movie.image && (
            <img src={movie.image} alt={movie.title} className="movie-image" />
          )}
          <div className="movie-meta">
            <h1>{movie.title}</h1>
            <p className="description">{movie.description}</p>
            <p className="genre">Genre: {movie.genre}</p>
            <p className="year">Year: {movie.year}</p>
            <p className="director">Director: {movie.director}</p>
          </div>
        </div>

        {/* Rating Section */}
        <div className="rating-section">
          <h2>Rate this movie</h2>
          <form onSubmit={handleSubmitRating}>
            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value={1}>1 - Poor</option>
              <option value={2}>2 - Fair</option>
              <option value={3}>3 - Good</option>
              <option value={4}>4 - Very Good</option>
              <option value={5}>5 - Excellent</option>
            </select>
            <button type="submit" disabled={ratingsStatus === "loading"}>
              {ratingsStatus === "loading" ? "Submitting..." : "Submit Rating"}
            </button>
          </form>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <h2>Comments</h2>
          
          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="add-comment-form">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add your comment..."
              required
            />
            <button type="submit" disabled={commentsStatus === "loading"}>
              {commentsStatus === "loading" ? "Posting..." : "Post Comment"}
            </button>
          </form>

          {/* Comments List */}
          <div className="comments-list">
            {commentsStatus === "loading" ? (
              <p>Loading comments...</p>
            ) : comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="comment-item">
                  <strong>{comment.userId?.name || "Anonymous"}</strong>
                  <p>{comment.text || comment.comment}</p>
                  <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <p>No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailsPage
