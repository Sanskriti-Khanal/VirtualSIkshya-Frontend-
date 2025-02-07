import React, { useState, useContext } from 'react';
import { DarkModeContext } from './Darkmode';
import '../styles/Sidebar.css';
import logo1 from '../assets/Images/logo1.png';
import logo2 from '../assets/Images/logo2.png';

const Sidebar = () => {
  const { isDarkMode } = useContext(DarkModeContext);


  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <img id="logo" src={isDarkMode ? logo2 : logo1} alt="Logo" />
          <hr />
        </div>
        <ul className="sidebar-menu">
          <li><a href="#"><i className="fas fa-tachometer-alt"></i><span>Dashboard</span></a></li>
          <li><a href="#"><i className="fas fa-book"></i><span>Learnings</span></a></li>
          <li><a href="#"><i className="fas fa-tasks"></i><span>My Assignments</span></a></li>
          <li><a href="#"><i className="fas fa-clipboard-list"></i><span>Tasks</span></a></li>
          <li><a href="#"><i className="fas fa-calendar-check"></i><span>Attendance</span></a></li>
          <li><a href="#"><i className="fas fa-chart-line"></i><span>Results</span></a></li>
          <li><a href="#"><i className="fas fa-calendar-alt"></i><span>Events</span></a></li>
          <li>
            <a href="#">
              <i className="fas fa-clock"></i><span>Routine</span>
            </a>
          </li>
          <li><a href="#"><i className="fas fa-question-circle"></i><span>Quiz</span></a></li>
          <li><a href="#"><i className="fas fa-money-bill-wave"></i><span>Fees</span></a></li>
          <hr />
          <li><a href="#"><i className="fas fa-user"></i><span>Profile</span></a></li>
          <li><a href="#" className="logout"><i className="fas fa-sign-out-alt"></i><span>Logout</span></a></li>
        </ul>
      </aside>

    </>
  );
};

export default Sidebar;