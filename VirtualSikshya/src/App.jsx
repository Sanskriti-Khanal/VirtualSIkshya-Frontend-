import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthForm from "./pages/Authform";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";  // ✅ No curly braces!
import GuestDashboard from "./pages/GuestDashboard";


const App = () => {

    return (

    //     <DarkModeProvider>
    //     <div className="dashboard">
    //         <Dashboardside/>
    //         <Dashboardnav />
    //     </div>
    // </DarkModeProvider>
        // <Navbar/>
        <Router> 
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />
      </Routes>
    </Router>
    );
};

export default App;