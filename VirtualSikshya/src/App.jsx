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
import TeacherAssignment from "./pages/Assignment/Teacherassignment";
import StudentAssignment from "./pages/Assignment/Studentassignment";//need to modify

//Attendance
import TeacherAttendance from "./pages/Attndance/Teacheratt";
// import StudentAttendance from "./pages/Attndance/Studentatt";

//Events
import TeacherEvents from "./pages/Event/teacherevent";
import StudentEvents from "./pages/Event/studentevent";
import AdminEvents from "./pages/Event/adminevents";

//Routine
import TeacherRoutine from "./pages/Routine/teacherroutine";
import StudentRoutine from "./pages/Routine/studentroutine";
import AdminRoutine from "./pages/Routine/adminroutine";

//Notices
import Notices from "./pages/Notices/adminnotics";
import Notification from "./pages/Notices/teacherstd";

//Profile
import Teacherform from "./pages/form/teacher";
import Studentform from "./pages/form/student";
import ProfileDashboard from "./pages/form/admin";
 
//Quiz
import Quiz from "./pages/Quiz/quiz";
import Teacherquiz from "./pages/Quiz/teacherquiz"

//CourseCrud
import Addcourse from "./pages/course/admincourse";
import AddLessons from "./pages/course/teacherlesson";


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
                <Route path="/admin-learnings" element={<AdminLearningDashboard />} />

                {/* Assignment */}
                <Route path="/teacher-assignment" element={<TeacherAssignment />} />
                <Route path="/student-assignment" element={<StudentAssignment />} />

                {/* Attendance */}
                {/* <Route path="/student-attendance" element={<StudentAttendance />} /> */}
                <Route path="/teacher-attendance" element={<TeacherAttendance />} /> 

                {/* Events */}
                <Route path="/admin-events" element={<AdminEvents />} />
                <Route path="/teacher-events" element={<TeacherEvents />} />
                <Route path="/student-events" element={<StudentEvents />} />


                {/* Routine */}
                <Route path="/teacher-routine" element={<TeacherRoutine />} />
                <Route path="/student-routine" element={<StudentRoutine />} />
                <Route path="/admin-routine" element={<AdminRoutine />} />

                {/* Notification */}
                <Route path="/admin-notices" element={<Notices />} />
                <Route path="/notification" element={<Notification />} />

                {/* Profile */}
                <Route path="/student-profile" element={<Studentform />} />
                <Route path="/teacher-profile" element={<Teacherform />} />
                <Route path="/admin-profile" element={<ProfileDashboard />} />

                {/* Quiz */}
                <Route path="/student-quiz" element={<Quiz />} />
                <Route path="/teacher-quiz" element={<Teacherquiz />} />

                {/* CourseCrud */}
              <Route path="/admin-course" element={<Addcourse />} />
             <Route path="/Teacher-Lessons" element={<AddLessons />} /> 
                
            
              
                

            </Routes>

        </div>
    );
};

export default App;
