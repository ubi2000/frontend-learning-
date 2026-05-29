import axios from "axios";

export const movieApi = axios.create({
  baseURL: "http://localhost:8080",
})

movieApi.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    delete config.headers.Authorization
  }
  return config
}, (error) => Promise.reject(error))