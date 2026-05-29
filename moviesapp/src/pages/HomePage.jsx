import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Banner from '../components/Banner'
import Navbar from '../components/Navbar'
import Row from '../components/Row'
import { getMovies, getMoviesStatus, selectAllMovies } from '../slices/movieSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const status = useSelector(getMoviesStatus)
  const movies = useSelector(selectAllMovies)

  console.log(movies)
  useEffect(() => {
    if(status === "idle"){
      dispatch(getMovies())
    }
  }, []);

  return (
    <div className='page' style={{backgroundColor: "#111", overflow: "hidden"}}>
      <Navbar />
      <Banner />

      {movies && Object.keys(movies).map((category) => (
        <Row key={category} title={category} movies={movies[category]}/>
      ))}
    </div>
  )
}

export default HomePage
