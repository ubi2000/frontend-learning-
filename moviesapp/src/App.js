import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditMoviePage from "./pages/EditMoviePage";
import SearchPage from "./pages/SearchPage";
import CategoriesPage from "./pages/CategoriesPage";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import AddMovieForm from "./components/AddMovieForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/edit-movie/:movieId" element={<EditMoviePage />} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/add-movie" element={<AddMovieForm />} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<UserProfilePage />} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/search" element={<SearchPage />} />
        </Route>
        
        <Route element={<PrivateRoute />}>
          <Route path="/categories" element={<CategoriesPage />} />
        </Route>
        
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
