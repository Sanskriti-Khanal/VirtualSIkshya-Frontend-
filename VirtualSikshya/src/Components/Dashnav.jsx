import React, { useContext, useState, useEffect } from 'react';
import { DarkModeContext } from './Darkmode';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/Sidebar.css';
import profileImage from '../assets/Images/profile.jpg';

const Dashnav = ({ role }) => {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [userName, setUserName] = useState("User"); // Default to "User" in case no name is found

    // Fetch user name from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        console.log("Stored user data:", storedUser); // Debugging log

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                console.log("Parsed user data:", parsedUser); // Debugging log

                if (parsedUser.name) {
                    setUserName(parsedUser.name);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    // Determine the greeting message dynamically
    const getGreetingMessage = () => {
        if (role === "admin") return "Welcome to Admin’s Dashboard";
        if (role === "teacher") return "Welcome to Teacher’s Dashboard";
        return "Welcome to Student’s Dashboard"; // Default to student
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="greeting">{getGreetingMessage()}</span>
            </div>
            <div className="navbar-right">
                <input type="text" className="search-bar" placeholder="Search..." />
                <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                    <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
                </button>
                <button className="notifications"><i className="fas fa-bell"></i></button>
                <img src={profileImage} alt="Profile" className="profile-image" />
                <span className="profile-name">{userName}</span> {/* ✅ Display user name */}
            </div>
        </nav>
    );
};

export default Dashnav;
