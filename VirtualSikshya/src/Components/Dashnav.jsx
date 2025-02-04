import React, { useContext } from 'react';
import { DarkModeContext } from './Darkmode';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Sidebar.css';
import profileImage from '../assets/Images/profile.jpg';

const Dashnav = () => {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="greeting">Welcome to Student's Dashboard</span>
            </div>
            <div className="navbar-right">
                <input type="text" className="search-bar" placeholder="Search..." />
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                    <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
                </button>
                <button className="notifications"><i className="fas fa-bell"></i></button>
                <img src={profileImage} alt="Profile" className="profile-image" />
                <span className="profile-name">User Name</span>
            </div>
        </nav>
    );
};

export default Dashnav;
