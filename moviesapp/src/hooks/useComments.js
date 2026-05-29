import { useDispatch, useSelector } from "react-redux"
import { getCommentsByMovieId, selectAllComments, selectCommentsStatus } from "../slices/commentSlice"
import { useEffect } from "react"

const useComments = (movieId) => {
  const dispatch = useDispatch()
  const comments = useSelector(selectAllComments)
  const status = useSelector(selectCommentsStatus)

  useEffect(() => {
    if (movieId && status === "idle") {
      dispatch(getCommentsByMovieId(movieId))
    }
  }, [movieId, dispatch, status])

  return { comments, status }
}

export default useComments
