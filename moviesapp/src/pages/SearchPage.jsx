import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/SearchPage.css'

const SearchPage = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterGenre, setFilterGenre] = useState('All')
  const [filterYear, setFilterYear] = useState('All')

  // Mock data - in real app, this would come from Redux or API
  const allMovies = [
    {
      _id: '1',
      title: 'Inception',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi',
      year: '2010',
      image: 'https://via.placeholder.com/200x300?text=Inception'
    },
    {
      _id: '2',
      title: 'The Dark Knight',
      director: 'Christopher Nolan',
      genre: 'Action',
      year: '2008',
      image: 'https://via.placeholder.com/200x300?text=Dark+Knight'
    },
    {
      _id: '3',
      title: 'Pulp Fiction',
      director: 'Quentin Tarantino',
      genre: 'Crime',
      year: '1994',
      image: 'https://via.placeholder.com/200x300?text=Pulp+Fiction'
    },
    {
      _id: '4',
      title: 'The Shawshank Redemption',
      director: 'Frank Darabont',
      genre: 'Drama',
      year: '1994',
      image: 'https://via.placeholder.com/200x300?text=Shawshank'
    },
    {
      _id: '5',
      title: 'Forrest Gump',
      director: 'Robert Zemeckis',
      genre: 'Drama',
      year: '1994',
      image: 'https://via.placeholder.com/200x300?text=Forrest+Gump'
    },
    {
      _id: '6',
      title: 'Interstellar',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi',
      year: '2014',
      image: 'https://via.placeholder.com/200x300?text=Interstellar'
    },
  ]

  const genres = ['All', 'Action', 'Sci-Fi', 'Drama', 'Crime', 'Comedy']
  const years = ['All', '2024', '2023', '2022', '2021', '2020', '2014', '2010', '2008', '1994']

  const filteredMovies = useMemo(() => {
    return allMovies.filter(movie => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesGenre = filterGenre === 'All' || movie.genre === filterGenre
      const matchesYear = filterYear === 'All' || movie.year === filterYear

      return matchesSearch && matchesGenre && matchesYear
    })
  }, [searchTerm, filterGenre, filterYear])

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`)
  }

  return (
    <div className="search-page">
      <Navbar />

      <div className="search-container">
        <h1>Search Movies</h1>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by title or director..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <label>Genre:</label>
            <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)}>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Year:</label>
            <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <button 
            className="reset-btn"
            onClick={() => {
              setSearchTerm('')
              setFilterGenre('All')
              setFilterYear('All')
            }}
          >
            Reset Filters
          </button>
        </div>

        <div className="search-results">
          <p className="results-count">Found {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''}</p>

          {filteredMovies.length === 0 ? (
            <div className="no-results">
              <p>No movies found matching your criteria.</p>
            </div>
          ) : (
            <div className="movies-grid">
              {filteredMovies.map(movie => (
                <div 
                  key={movie._id}
                  className="search-movie-card"
                  onClick={() => handleMovieClick(movie._id)}
                >
                  <img src={movie.image} alt={movie.title} />
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="director">{movie.director}</p>
                    <p className="meta">
                      <span>{movie.genre}</span>
                      <span>{movie.year}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
