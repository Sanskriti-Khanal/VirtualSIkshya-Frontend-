import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AuthForm from "./pages/Authform";
import Dashboardside from "./Components/Sidebar";
import Dashboardnav from "./Components/Dashnav";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import GuestDashboard from "./pages/GuestDashboard";
import { DarkModeProvider } from "./Components/Darkmode";

const App = () => {
    return (
        <DarkModeProvider>
            <Router>
                <MainLayout />
            </Router>
        </DarkModeProvider>
    );
};

// This component handles layout logic
const MainLayout = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/"; // Check if user is on login page
    const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in
    const userRole = localStorage.getItem("role") || "student"; // Default to student

    return (
        <div>
            {/* Show Sidebar & Navbar only if user is logged in */}
            {isAuthenticated && !isLoginPage && (
                <div className="dashboard">
                    <Dashboardside />
                    <Dashboardnav role={userRole} />
                </div>
            )}

            {/* Define routes */}
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/guest-dashboard" element={<GuestDashboard />} />
            </Routes>
        </div>
    );
};

export default App;
