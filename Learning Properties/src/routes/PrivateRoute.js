import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppStatContext } from "../hooks/useAppStatContext";

const PrivateRoute = () => {
  const { appState } = useAppStatContext();

  return appState?.isAuthenticated && appState?.user ? (
    <Outlet /> // show the child page
  ) : (
    <Navigate to="/login" /> // redirect to /login
  );
};

export default PrivateRoute;
