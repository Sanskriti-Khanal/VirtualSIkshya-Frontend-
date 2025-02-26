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
                  <Link to="/admin-dashboard">
                    <i className="fas fa-tachometer-alt"></i>
                    <span>Dashboard</span>
                  </Link>
                </li>
      <li> 
  <Link to="/admin-notices">
    <i className="fas fa-bell"></i>
    <span>Notices</span>
  </Link>
</li>
<li> 
  <Link to="/admin-events">
    <i className="fas fa-calendar-alt"></i>
    <span>Events</span>
  </Link>
</li>

<li> 
  <Link to="/admin-learnings">
    <i className="fas fa-book"></i>
    <span>Learnings</span>
  </Link>
</li>
<li>
          <Link to="/admin-routine">
            <i className="fas fa-clock"></i>
            <span>Routine</span>
          </Link>
        </li>
<li> 
  <Link to="/admin-profile">
    <i className="fas fa-user"></i>
    <span>Profile</span>
  </Link>
</li>
{/* <li> 
  <Link to="/admin-fees">
    <i className="fas fa-wallet"></i>
    <span>Fees</span>
  </Link>
</li> */}
<hr />
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
