import axios from "axios";

// Base URL for the backend
const BASE_URL = "http://localhost:8080";

// Axios instance for JSON requests
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // If using cookies or sessions
});

// Axios instance for FormData (File Uploads)
export const apiForm = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
});


// User API Endpoints
export const userAPI = {
    register: (data) => api.post("/users/register", data),
    login: (data) => api.post("/users/login", data),
    getProfile: () => api.get("/users/profile"),
    getAllUsers: () => api.get("/users"),
    updateUser: (userId, data) => api.put(`/users/${userId}`, data),
    deleteUser: (userId) => api.delete(`/users/${userId}`)
};
