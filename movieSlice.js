import React from 'react'
import useFetchData from "../hooks/useFetchData"

const MovieDetailsPage = () => {

   const { data, loading, error } = useFetchData("/movies")

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div>
      Movie Details
       {data && <p>{data.movies}</p>}
    </div>
  )
}

export default MovieDetailsPage
