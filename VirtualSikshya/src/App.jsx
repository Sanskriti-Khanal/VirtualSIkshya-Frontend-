import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AuthForm from "./pages/Authform";
import Dashboardside from "./Components/Sidebar/TeacherSidebar";
import Dashboardnav from "./Components/Dashnav";
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import { DarkModeProvider } from "./Components/Darkmode";

// LearningDashboard
import TeacherLearningDashboard from "./pages/Learning/TeacherLearn";
import StudentLearningDashboard from "./pages/Learning/StudentLearn";
import AdminLearningDashboard from "./pages/Learning/AdminLearn";

//Assignment
// import TeacherAssignment from "./pages/Assignment/Teacherassignment";
import StudentAssignment from "./pages/Assignment/Studentassignment";

//Attendance
// import TeacherAttendance from "./pages/Attendance/Teacherattendance";
// import StudentAttendance from "./pages/Attendance/Studentattendance";

//Events
// import TeacherEvents from "./pages/Events/TeacherEvents";
// import StudentEvents from "./pages/Events/StudentEvents";
// import AdminEvents from "./pages/Events/AdminEvents";

//Routine
// import TeacherRoutine from "./pages/Routine/TeacherRoutine";
// import StudentRoutine from "./pages/Routine/StudentRoutine";
// import AdminRoutine from "./pages/Routine/AdminRoutine";



import Teacherform from "./pages/form/teacher";
import Studentform from "./pages/form/student";
import TeacherFees from "./pages/Fees/Teacher";
import Quiz from "./pages/Quiz/quiz";
import ProfileDashboard from "./Components/form/profile";



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

                {/* learning */}
                <Route path="/teacher-learning" element={<TeacherLearningDashboard />} />
                <Route path="/student-learning" element={<StudentLearningDashboard />} />
                <Route path="/admin-learning" element={<AdminLearningDashboard />} />

                {/* Assignment */}
               {/*  <Route path="/teacher-assignment" element={<TeacherAssignment />} /> */}
                <Route path="/student-assignment" element={<StudentAssignment />} />

                {/* Attendance */}
                {/* <Route path="/student-attendance" element={<StudentAttendance />} />
                <Route path="/teacher-attendance" element={<TeacherAttendance />} /> */}

                {/* Events */}


                {/* Routine */}




                <Route path="/student-profile" element={<Studentform />} />
                <Route path="/teacher-profile" element={<Teacherform />} />
                <Route path="/fees" element={<TeacherFees />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/profile" element={<ProfileDashboard />} />
            
              
                

            </Routes>

        </div>
    );
};

export default App;
