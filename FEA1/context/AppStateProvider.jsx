import React, { createContext, useEffect, useReducer } from 'react'
import { AppStateReducer } from './AppStateReducer'

const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem("user") ? true : false,
  user: JSON.parse(localStorage.getItem("user"))
  ,
  theme: localStorage.getItem("theme") || "dark"
}

export const AppStateContext = createContext(INITIAL_STATE)

const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppStateReducer, INITIAL_STATE)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', state.theme)
    }
  }, [state.theme])

  return (
    <AppStateContext.Provider value={{ appState: state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export default AppStateProvider
