import axios from "axios";

export const movieApi = axios.create({
  baseURL: "http://localhost:8080",
})

// Add token to every request
movieApi.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
})

// Handle 401 errors (token expired/invalid)
movieApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
)