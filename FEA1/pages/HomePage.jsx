import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import { movieApi } from '../constants/axios'
import { movieRequests } from '../constants/requests'
import Row from '../components/Row'
import SkeletonLoader from '../components/SkeletonLoader'

const HomePage = () => {
  const [movies, setMovies] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await movieApi.get(movieRequests.fetchAllMovies)
        setMovies(request.data.movies)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchData()
  }, []);

  return (
    <div className='page'>
      <Navbar />
      <Banner loading={loading} />

      {loading ? (
        ["Trending", "Top Rated", "Action", "Comedy"].map((category) => (
          <SkeletonLoader key={category} title={category} />
        ))
      ) : (
        Object.keys(movies).map((category) => (
          <Row key={category} title={category} movies={movies[category]}/>
        ))
      )}
    </div>
  )
}

export default HomePage
