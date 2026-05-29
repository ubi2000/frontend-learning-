import React from 'react'
import { useAppStatContext } from '../hooks/useAppStateContext'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoute = () => {
  const {appState} = useAppStatContext()

  console.log("PublicRouter", !appState?.isAuthenticated && !appState?.user)
  return appState?.isAuthenticated && appState?.user ? (
    <Navigate to="/home"/>
  ) : (
    <Outlet />
  )
}

export default PublicRoute
