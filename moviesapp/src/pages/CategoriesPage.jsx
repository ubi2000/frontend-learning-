import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/CategoriesPage.css'

const CategoriesPage = () => {
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)

  // Mock categories data
  const categories = [
    {
      id: 'action',
      name: 'Action',
      description: 'High-octane thrills and explosive adventures',
      icon: '💥',
      movies: [
        { _id: '1', title: 'The Dark Knight', year: '2008', image: 'https://via.placeholder.com/150x225?text=Dark+Knight' },
        { _id: '2', title: 'Mad Max', year: '2015', image: 'https://via.placeholder.com/150x225?text=Mad+Max' },
      ]
    },
    {
      id: 'scifi',
      name: 'Sci-Fi',
      description: 'Journey to distant worlds and future times',
      icon: '🚀',
      movies: [
        { _id: '3', title: 'Inception', year: '2010', image: 'https://via.placeholder.com/150x225?text=Inception' },
        { _id: '4', title: 'Interstellar', year: '2014', image: 'https://via.placeholder.com/150x225?text=Interstellar' },
      ]
    },
    {
      id: 'drama',
      name: 'Drama',
      description: 'Compelling human stories and emotions',
      icon: '🎭',
      movies: [
        { _id: '5', title: 'The Shawshank Redemption', year: '1994', image: 'https://via.placeholder.com/150x225?text=Shawshank' },
        { _id: '6', title: 'Forrest Gump', year: '1994', image: 'https://via.placeholder.com/150x225?text=Forrest' },
      ]
    },
    {
      id: 'comedy',
      name: 'Comedy',
      description: 'Laugh-out-loud entertainment',
      icon: '😂',
      movies: [
        { _id: '7', title: 'The Grand Budapest Hotel', year: '2014', image: 'https://via.placeholder.com/150x225?text=Budapest' },
        { _id: '8', title: 'Superbad', year: '2007', image: 'https://via.placeholder.com/150x225?text=Superbad' },
      ]
    },
    {
      id: 'horror',
      name: 'Horror',
      description: 'Spine-tingling scares and supernatural thrills',
      icon: '👻',
      movies: [
        { _id: '9', title: 'The Shining', year: '1980', image: 'https://via.placeholder.com/150x225?text=Shining' },
        { _id: '10', title: 'Hereditary', year: '2018', image: 'https://via.placeholder.com/150x225?text=Hereditary' },
      ]
    },
    {
      id: 'romance',
      name: 'Romance',
      description: 'Heartwarming love stories',
      icon: '❤️',
      movies: [
        { _id: '11', title: 'The Notebook', year: '2004', image: 'https://via.placeholder.com/150x225?text=Notebook' },
        { _id: '12', title: 'La La Land', year: '2016', image: 'https://via.placeholder.com/150x225?text=LaLaLand' },
      ]
    },
  ]

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  return (
    <div className="categories-page">
      <Navbar />

      <div className="categories-container">
        <h1>Movie Categories</h1>
        <p className="subtitle">Explore movies by genre</p>

        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div
                className="category-header"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="category-icon">{category.icon}</div>
                <h2>{category.name}</h2>
                <span className="expand-icon">
                  {selectedCategory === category.id ? '−' : '+'}
                </span>
              </div>

              <p className="category-description">{category.description}</p>

              {selectedCategory === category.id && (
                <div className="category-movies">
                  {category.movies.map(movie => (
                    <div
                      key={movie._id}
                      className="category-movie"
                      onClick={() => handleMovieClick(movie._id)}
                    >
                      <img src={movie.image} alt={movie.title} />
                      <div className="movie-details">
                        <h4>{movie.title}</h4>
                        <p>{movie.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
