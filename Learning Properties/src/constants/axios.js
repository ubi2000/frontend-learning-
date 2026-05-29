import axios from "axios";

export const learningAPI = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`,
  },
});
