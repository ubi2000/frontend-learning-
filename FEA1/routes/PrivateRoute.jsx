import React from 'react'
import { useAppStatContext } from '../hooks/useAppStateContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {

  const {appState} = useAppStatContext()

  return appState?.isAuthenticated && appState?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login"/>
  )
}

export default PrivateRoute
