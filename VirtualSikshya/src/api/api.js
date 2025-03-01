import axios from "axios";

//  Set your backend URL
const BASE_URL = "http://localhost:8080";

// Axios Instance (Automatically includes Authorization headers if token exists)
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// 🔹 Attach Token to Requests (if available)
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 🔹 Centralized API Calls for User Authentication
export const userAPI = {
    register: (userData) => api.post("/users/register", userData),
    login: (credentials) => api.post("/users/login", credentials),
    getProfile: () => api.get("/users/profile"),
    getAllUsers: () => api.get("/users"),
    updateUser: (userId, updatedData) => api.put(`/users/${userId}`, updatedData),
    deleteUser: (userId) => api.delete(`/users/${userId}`),
};

// 🔹 Centralized API Calls for Course Management
export const courseAPI = {
    // Get all courses (Public)
    getAllCourses: () => api.get("/courses"),

    // Get a single course by ID (Public)
    getCourseById: (courseId) => api.get(`/courses/${courseId}`),

    // Create a new course (Admin & Teacher only) - Route updated to /create_course
    createCourse: (courseData) => api.post("/courses/create_course", courseData),

    // Update a course (Admin & Teacher only)
    updateCourse: (courseId, updatedData) => api.put(`/courses/${courseId}`, updatedData),

    // Delete a course (Admin only)
    deleteCourse: (courseId) => api.delete(`/courses/${courseId}`),
};

// Export API instance if needed
export default api;
