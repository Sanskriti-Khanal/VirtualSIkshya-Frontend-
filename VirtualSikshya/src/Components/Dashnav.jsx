import React, { useContext, useState, useEffect } from 'react';
import { DarkModeContext } from './Darkmode';
// import axios from '../api'; // Import API helper
import '@fortawesome/fontawesome-free/css/all.min.css';
import '.././styles/Sidebar.css';
import profileImage from '../assets/Images/profile.jpg';

const Dashnav = ({ role }) => {
    const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
    const [userName, setUserName] = useState("User");
    const [notices, setNotices] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); // To toggle the notice dropdown

    // Fetch user name from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser.name) {
                    setUserName(parsedUser.name);
                }
            } catch (error) {
                console.error("Error parsing user data:", error);
            }
        }
    }, []);

    // Fetch notices from API
    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('/notices'); // Fetch notices from API
                setNotices(response.data);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };
        fetchNotices();
    }, []);

    // Determine greeting message dynamically
    const getGreetingMessage = () => {
        if (role === "admin") return "Welcome to Admin’s Dashboard";
        if (role === "teacher") return "Welcome to Teacher’s Dashboard";
        return "Welcome to Student’s Dashboard";
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

                {/* Notification Bell with Counter */}
                <div className="notification-wrapper">
                    <button 
                        className="notifications" 
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <i className="fas fa-bell"></i>
                        {notices.length > 0 && <span className="notification-count">{notices.length}</span>}
                    </button>

                    {/* Notification Dropdown */}
                    {showDropdown && (
                        <div className="notification-dropdown">
                            {notices.length === 0 ? (
                                <p className="no-notices">No new notices</p>
                            ) : (
                                <ul>
                                    {notices.map((notice, index) => (
                                        <li key={index} className="notice-item">
                                            <strong>{notice.title}</strong>
                                            <p>{notice.description}</p>
                                            <small>{new Date(notice.createdAt).toLocaleDateString()}</small>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>

                <img src={profileImage} alt="Profile" className="profile-image" />
                <span className="profile-name">{userName}</span>
            </div>
        </nav>
    );
};

export default Dashnav;
