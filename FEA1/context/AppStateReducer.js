export const AppStateReducer = (state, action) => {
  switch (action.type) {
    case "Login": {
      localStorage.setItem("user", JSON.stringify({ ...action.payload, isAuthenticated: true }))

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    }
    case "Register": {
      localStorage.setItem("user", JSON.stringify({ ...action.payload, isAuthenticated: true }))

      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    }
    case "ToggleTheme": {
      const nextTheme = state.theme === "dark" ? "light" : "dark"
      localStorage.setItem("theme", nextTheme)

      return {
        ...state,
        theme: nextTheme
      }
    }
    case "Logout": {
      localStorage.removeItem("user")
      return {
        isAuthenticated: false,
        user: null
      }
    }
    default:
      return state
  }
}