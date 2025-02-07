import axios from "axios";

// Base API configuration
const API = axios.create({
  baseURL: "http://localhost:3001/api", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token for authenticated requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication APIs
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);
export const getProfile = () => API.get("/users/profile");

export default API;
