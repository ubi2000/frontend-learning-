// User endpoints
export const userRequests = {
  login: "/users/login",
  logout: "/users/logout",
  register: "/users/register",
  getProfile: "/users/me",
}

// Movie endpoints
export const movieRequests = {
  fetchAllMovies: "/movies",
  fetchNetflixOriginals: "/movies?category=Netflix Originals",
  addMovie: "/movies/add",
  getMovieById: "/movies",
  updateMovie: "/movies",
  uploadImage: "/movies/upload",
}

// Comments endpoints
export const commentRequests = {
  getCommentsByMovieId: "/comments",
  addComment: "/comments",
}

// Ratings endpoints
export const ratingRequests = {
  addRating: "/ratings",
}