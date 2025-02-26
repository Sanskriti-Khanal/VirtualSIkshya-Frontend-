import React, { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../Darkmode";
import { Link } from "react-router-dom";
import "../../styles/Sidebar.css";
import logo1 from "../../assets/Images/logo1.png";
import logo2 from "../../assets/Images/logo2.png";

const Sidebar = () => {
  
  const { isDarkMode } = useContext(DarkModeContext);
  const [role, setRole] = useState("guest"); // Default to guest

  useEffect(() => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData?.role) {
        setRole(userData.role);
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }, []);

  // Determine dashboard route based on role
  const dashboardRoutes = {
    student: "/student-dashboard",
    teacher: "/teacher-dashboard",
    admin: "/admin-dashboard",
    
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img
          id="logo"
          src={isDarkMode ? logo2 : logo1}
          alt="Logo"
          onError={(e) => (e.target.src = logo1)} // Fallback to logo1 if not found
        />
        <hr />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/teacher-dashboard">
            <i className="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to="/teacher-learning">
            <i className="fas fa-book"></i>
            <span>Learnings</span>
          </Link>
        </li>
        <li>
          <Link to="/teacher-assignment">
            <i className="fas fa-tasks"></i>
            <span>My Assignments</span>
          </Link>
        </li>
    
        <li>
          <Link to="/teacherattendance">
            <i className="fas fa-calendar-check"></i>
            <span>Attendance</span>
          </Link>
        </li>
        {/* <li>
          <Link to="/results">
            <i className="fas fa-chart-line"></i>
            <span>Results</span>
          </Link>
        </li> */}
        <li> 
          <Link to="/teacher-events">
            <i className="fas fa-calendar-alt"></i>
            <span>Events</span>
          </Link>
        </li>
        <li>
          <Link to="/teacher-routine">
            <i className="fas fa-clock"></i>
            <span>Routine</span>
          </Link>
        </li>
        <li>
          <Link to="/teacher-quiz">
            <i className="fas fa-question-circle"></i>
            <span>Quiz</span>
          </Link>
        </li>
        {/* <li>
          <Link to="/fees">
            <i className="fas fa-money-bill-wave"></i>
            <span>Fees</span>
          </Link>
        </li> */}
        <hr />
        <li>
         <Link to="teacher-profile">
           <i className="fas fa-user"></i>
           <span>Profile</span>
         </Link>
         </li>

        <li>
          <Link to="/logout" className="logout">
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
