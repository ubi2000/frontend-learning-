import { useDispatch, useSelector } from "react-redux"
import { addRating, selectAllRatings, selectRatingsStatus } from "../slices/ratingSlice"

const useRatings = () => {
  const dispatch = useDispatch()
  const ratings = useSelector(selectAllRatings)
  const status = useSelector(selectRatingsStatus)

  const submitRating = (movieId, ratingData) => {
    return dispatch(addRating({ movieId, ratingData }))
  }

  return { ratings, status, submitRating }
}

export default useRatings
