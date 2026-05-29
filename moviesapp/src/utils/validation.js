// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password) => {
  // At least 6 characters
  if (password.length < 6) {
    return { valid: false, message: "Password must be at least 6 characters" }
  }
  return { valid: true, message: "" }
}

export const validateUsername = (username) => {
  if (username.length < 3) {
    return { valid: false, message: "Username must be at least 3 characters" }
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, message: "Username can only contain letters, numbers, and underscores" }
  }
  return { valid: true, message: "" }
}

export const validateMovieForm = (movieData) => {
  const errors = {}
  
  if (!movieData.title?.trim()) {
    errors.title = "Title is required"
  }
  if (!movieData.director?.trim()) {
    errors.director = "Director is required"
  }
  if (!movieData.genre?.trim()) {
    errors.genre = "Genre is required"
  }
  if (movieData.year && isNaN(movieData.year)) {
    errors.year = "Year must be a valid number"
  }
  if (movieData.year && (movieData.year < 1800 || movieData.year > new Date().getFullYear())) {
    errors.year = `Year must be between 1800 and ${new Date().getFullYear()}`
  }
  
  return { isValid: Object.keys(errors).length === 0, errors }
}

export const validateCommentForm = (comment) => {
  if (!comment?.trim()) {
    return { valid: false, message: "Comment cannot be empty" }
  }
  if (comment.length > 1000) {
    return { valid: false, message: "Comment must be less than 1000 characters" }
  }
  return { valid: true, message: "" }
}
